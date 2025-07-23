// src/components/QuizPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import quizData from "../data/quiz.json";

/*
1. currentIndex: chỉ số câu hỏi hiện tại
2. selected: chỉ số đáp án mà player đã chọn (chưa chọn = null)
3. score: điểm của player
4. showResult: cho biết kết quả
5. timeLeft: thời gian đếm ngược
*/
const QuizPage = ({ playerName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const currentQuestion = quizData[currentIndex];

  // Sử dụng useCallback để đảm bảo hàm không bị thay đổi giữa các render
  // Xử lý khi chọn đáp án hoặc hết giờ
  const handleAnswer = useCallback(
    (optionIndex) => {
      setSelected(optionIndex); // Lưu đáp án đã chọn

      // Kiếm tra đúng hay sai
      const isCorrect = optionIndex === currentQuestion.answer;
      if (isCorrect) setScore((prev) => prev + 1);
      
      // Thời gian chờ sau khi chọn đáp án
      setTimeout(() => {
        if (currentIndex + 1 < quizData.length) {
          setCurrentIndex((prev) => prev + 1);
          setSelected(null);
          setTimeLeft(20);
        } else {
          setShowResult(true);
        }
      }, 1000);
    },
    [currentIndex, currentQuestion.answer]
  );

  // Đếm ngược thời gian
  useEffect(() => {
    if (timeLeft > 0 && !selected) {
      // const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      const timer = setTimeout(() => setTimeLeft((prev) => prev), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && !selected) {
      handleAnswer(null);
    }
  }, [timeLeft, selected, handleAnswer]);

  // Lưu điểm khi hoàn thành
  useEffect(() => {
    if (showResult && playerName) {
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

      // Cập nhật bảng xếp hạng
      const updatedBoard = [
        ...leaderboard,
        { name: playerName, score, time: new Date().toLocaleString() },
      ];
      // Bảng xếp hạng 5 kết quả gần nhất
      const trimmedBoard = updatedBoard.slice(-5);
      localStorage.setItem("leaderboard", JSON.stringify(trimmedBoard));
    }
  }, [showResult, playerName, score]);

  if (showResult) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Giao diện kết quả và bảng xếp hạng
    return (
      <div className="quiz-container">
        <h2 className="question-title">🎉 Hoàn thành quiz!</h2>
        <p>Điểm số của bạn, {playerName}: <strong>{score}/{quizData.length}</strong></p>

        <h3 style={{ marginTop: "30px" }}>🏆 Bảng xếp hạng gần nhất:</h3>
        <ul>
          {leaderboard
            .slice()
            .reverse()
            .map((entry, index) => (
              <li key={index}>
                {entry.name} – {entry.score} điểm ({entry.time})
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    // Hiển thị câu hỏi
    <div className="quiz-container">
      <h1 className="question-title">
        Câu {currentIndex + 1}/{quizData.length}
      </h1>
      <p>{currentQuestion.question}</p>
      
      {/*Hiển thị các lựa chọn*/}
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => {
          let className = "option-button";
          if (selected !== null) {
            if (index === currentQuestion.answer) {
              className += " correct";
            } else if (index === selected) {
              className += " incorrect";
            }
          }
          
          // Hiển thị nút chọn đáp án
          return (
            <button
              key={index}
              className={className}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="timer">⏳ {timeLeft} giây</div>
    </div>
  );
};

export default QuizPage;