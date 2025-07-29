/*
Giao diện khi thực hiện quiz
*/
import React, { useEffect, useState, useCallback, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./QuizPage.css"
/*
1. currentIndex: chỉ số câu hỏi hiện tại
2. selected: chỉ số đáp án mà player đã chọn (chưa chọn = null)
3. score: điểm của player
4. showResult: cho biết kết quả
5. timeLeft: thời gian đếm ngược
6. hasSaved: cờ báo đã lưu
7. quizData: lấy data của quiz dựa vào quizId
8. quizId: ID của mỗi bộ câu hỏi
*/
const QuizPage = ({
  playerName,
  onViewLeaderboard,
  showResultPage,
  setLastScore,
  lastScore,
  quizData,
  quizId,
}) => { 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const hasSaved = useRef(false);
  const startTime = useRef(new Date());

  const currentQuestion = quizData[currentIndex];

  // Sử dụng useCallback để đảm bảo hàm không bị thay đổi giữa các render
  // Xử lý khi chọn đáp án hoặc hết giờ
  const handleAnswer = useCallback(
    (optionIndex) => {
      setSelected(optionIndex); // Lưu đáp án đã chọn

      // Kiếm tra đúng hay sai
      const isCorrect = optionIndex === currentQuestion.answer;
      if (isCorrect) {
        //Tính điểm bonus dựa trên thời gian còn lại
        const bonusScore = Math.round((timeLeft / 20) * 10);
        setScore((prev) => prev + 10 + bonusScore);
      }
      // else{

      // }
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
    [currentIndex, currentQuestion.answer, timeLeft]
  );

  // Đếm ngược thời gian
  useEffect(() => {
    if (timeLeft > 0 && !selected) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && !selected) {
      handleAnswer(null);
    }
  }, [timeLeft, selected, handleAnswer]);

  // Lưu điểm khi hoàn thành
  useEffect(() => {
    if (showResult && playerName && !hasSaved.current) {
      hasSaved.current = true;
      //Lưu điểm lại để khôi phục trang kết quả
      setLastScore(score);
      //Tính thời gian làm bài
      const endTime = new Date();
      const duration = endTime - startTime.current;
      //Lưu bản ghi vào cloud
      const saveScore = async () => {
        await addDoc(collection(db, "leaderboard"), {
          name: playerName,
          score,
          duration,
          time: new Date().toISOString(),
          quizId,
        });
      };
      saveScore();
    }
  }, [showResult, playerName, score, setLastScore, startTime]);

  if (showResult || showResultPage) {
    return (
      <div className="question-container">
        <div className="complete-quiz-grid">
          <div className="complete-quiz">
            <h2 className="complete-title">🎉 Hoàn thành quiz!</h2>
            <p className="complete-text">
              Điểm số của bạn, {playerName}:{" "}
              <strong>
                {lastScore}/{quizData.length * 20}
              </strong>
            </p>

            <div>
              <button className="reviewBoard" onClick={onViewLeaderboard}>
                📈 Xem bảng xếp hạng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-4 right-4 bg-white shadow-lg border border-gray-200 rounded-xl px-5 py-3 text-center">
        <div className="question-score">
          🎯 <strong>Điểm hiện tại: {score}</strong>
        </div>
      </div>

      {/*Hiển thị câu hỏi*/}
      <main className="question-wrapper">        
        <div className="question-container">
          <div>
            <h1 className="question-number">
              Câu {currentIndex + 1}/{quizData.length}
            </h1>
            <div className="question-text">
              {currentQuestion.question}
            </div>
          </div>

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
      </main>
    </>
  );
};

export default QuizPage;
