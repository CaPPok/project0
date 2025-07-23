import React, { useState } from "react";

const Login = ({ onStart }) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim() === "") return;
    onStart(name);
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">Chào mừng bạn đến với Quiz Quân khu 7!</h2>
      <p>Hãy nhập tên của bạn để bắt đầu:</p>
      <input
        type="text"
        placeholder="Nhập tên..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        className="option-button"
        onClick={handleStart}
        disabled={name.trim() === ""}
      >
        Bắt đầu chơi
      </button>
    </div>
  );
};

export default Login;
