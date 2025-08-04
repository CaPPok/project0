/*
Đây là trang chủ sau khi đã đăng nhập (login)
*/

import React from "react";
import "./HomePage.css";
import { useMediaQuery } from "react-responsive";

const quizzes = [
  {
    id: "quiz1",
    title: "Bộ câu hỏi số 1",
    description: "Trắc nghiệm cơ bản",
    image: "/img_quiz1.jpg",
  },
  {
    id: "quiz2",
    title: "Bộ câu hỏi số 2",
    description: "Trắc nghiệm nâng cao",
    image: "/img_quiz1.jpg",
  },
];

export default function HomePage({
  onSelectQuiz,
  playerName,
  onLogout,
  onGratitute,
  quizStatus,
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="home-container ${isMobile ? 'mobile' : 'laptop'}">
      {/*Thanh điều hướng*/}
      <nav className="navbar">
        <div className="navbar-title">Chào mừng, {playerName}</div>
        <div className="navbar-links">
          <a href="#">Minigame</a>
          <a onClick={onGratitute}>Gửi lời tri ân</a>
          <a onClick={onLogout}>Đăng xuất</a>
          <button
            onClick={() => alert("Chức năng chuyển theme")}
            className="theme-toggle"
          >
            🌗
          </button>

          <img src="/logo192.png" className="avatar" alt="avatar" />
        </div>
      </nav>

      {/*Hiển thị các quiz card*/}
      <main className="quiz-wrapper">
        <div className="quiz-row">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="quiz-card"
              onClick={() => onSelectQuiz(quiz.id)}
            >
              <img src={quiz.image} alt={quiz.title} className="quiz-image" />
              <div className="quiz-content">
                <h0 className="quiz-title">{quiz.title}</h0>
                <p className="quiz-description">{quiz.description}</p>
                <div className="quiz-progress">
                  {quizStatus?.[quiz.id]?.done
                    ? `Điểm đạt được: ${quizStatus[quiz.id].score}`
                    : "Chưa làm bài"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
