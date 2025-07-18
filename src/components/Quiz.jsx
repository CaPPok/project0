// src/components/Quiz.jsx
import React, { useState } from 'react';

const questions = [
  {
    question: 'Năm thành lập Chiến khu 7 là?',
    options: ['1945', '1946', '1954', '1975'],
    answer: 0
  },
  {
    question: 'Chiến dịch nào giải phóng miền Nam?',
    options: ['Điện Biên Phủ', 'Hồ Chí Minh', 'Tây Nguyên', 'Biên giới'],
    answer: 1
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleClick = (index) => {
    if (index === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Bạn đã trả lời đúng {score}/{questions.length} câu!</h2>
        </div>
      ) : (
        <div className="question-card">
          <h3>{questions[current].question}</h3>
          <div className="options">
            {questions[current].options.map((opt, i) => (
              <button key={i} onClick={() => handleClick(i)} className="option-btn">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
