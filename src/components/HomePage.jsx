/*
Đây là trang chủ sau khi đã đăng nhập (login)
*/

import React from "react";
import "./HomePage.css";

const quizzes = [
  {
    id: "quiz1",
    title: "Bộ câu hỏi số 1",
    description: "Trắc nghiệm kiến thức cơ bản",
    image: "/img_quiz1.jpg",
  },
  {
    id: "quiz2",
    title: "Bộ câu hỏi số 2",
    description: "Trắc nghiệm nâng cao",
    image: "/img_quiz1.jpg",
  },
];

export default function HomePage({ onSelectQuiz, playerName, onLogout }) {
  return (
    <div className="home-container">
      {/*Thanh điều hướng*/}
      <nav className="navbar">
        <div className="navbar-title">Chào mừng, {playerName}</div>
        <div className="navbar-links">
          <a href="#">Minigame</a>
          <a href="#">Gửi lời tri ân</a>
          <a onClick={onLogout}>Đăng suất</a>
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
              <img
                src={quiz.image}
                alt={quiz.title}
                className="quiz-image"
              />
              <div className="quiz-content">
                <h0 className="quiz-title">{quiz.title}</h0>
                <p className="quiz-description">{quiz.description}</p>
                <div className="quiz-progress">Điểm hiện tại:</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
