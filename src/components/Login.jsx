import React, { useState } from "react";

const Login = ({ onStart }) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim() === "") return;
    onStart(name);
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">
        Chào mừng bạn đến với phần trắc nghiệm của Quân khu 7!
      </h2>
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

      {/* 👉 Luật chơi */}
      <div
        style={{
          backgroundColor: "#f0f9ff",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #cce4f6",
          marginBottom: "20px",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        <strong>📜 Luật chơi:</strong>
        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
          <li>🕒 Mỗi câu hỏi có 20 giây để trả lời.</li>
          <li>✅ Chọn đúng sẽ được cộng 1 điểm.</li>
          <li>❌ Trả lời sai hoặc hết giờ sẽ không được điểm.</li>
          <li>🔚 Khi kết thúc, điểm và bảng xếp hạng sẽ được hiển thị.</li>
        </ul>
      </div>

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
