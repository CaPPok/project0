import React, { useState, useEffect } from "react";
import "./Login.css"
import { useMediaQuery } from 'react-responsive';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";
//import React, { useEffect, useRef } from "react";

//name: biến tên 
//showRules: biến dùng để ẩn/hiện bảng luật chơi
//showInst: biến dùng để ẩn/hiện bảng giới thiệu
const Login = ({ onStart }) => {
  const [name, setName] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [showInst, setShowInst] = useState(false);

  // Thêm màu nền chỉ riêng trang Login
  useEffect(() => {
    document.body.classList.add("login-background");
    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const handleStart = () => {
    //kiểm tra tên có bị rỗng hay không
    if (name.trim() === "") return;

    onStart(name);
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={`login-container ${isMobile ? 'mobile' : 'laptop'}`}>
      <div className={`login-left ${isMobile ? 'mobile' : 'laptop'}`}>
        <h1 className={`login-title ${isMobile ? 'mobile' : 'laptop'}`}>
          CHÀO MỪNG BẠN !
        </h1>
        <p className={`login-decription ${isMobile ? 'mobile' : 'laptop'}`}>Hãy cùng tìm hiểu về Quân khu 7</p>
        <input
          type="text"
          placeholder="Nhập tên để bắt đầu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`login-input ${isMobile ? 'mobile' : 'laptop'}`}
        />
        <div className={`login-button-grid ${isMobile ? 'mobile' : 'laptop'}`}>
          <button
            className={`login-button ${isMobile ? 'mobile' : 'laptop'}`}
            onClick={handleStart}
            disabled={name.trim() === ""}
          >
            Bắt đầu chơi
          </button>
          <button
            className={`rules-toggle-button ${isMobile ? 'mobile' : 'laptop'}`}
            onClick={() => setShowRules(!showRules)}
          >
            Luật chơi
          </button>
          <button
            className={`inst-toggle-button ${isMobile ? 'mobile' : 'laptop'}`}
            onClick={() => setShowInst(!showInst)}
          >
            Giới thiệu
          </button>
        </div>
      </div>

      <div className={`login-right ${isMobile ? 'mobile' : 'laptop'}`}>
        <img src="img-login.png" alt="Trường Quân sự Quân khu 7" />
      </div>

      {/* Khung luật chơi trượt từ dưới lên */}
      <div className={`rules-drawer ${isMobile ? 'mobile' : 'laptop'} ${showRules ? "show" : ""}`}>
        <div className={`rules-content ${isMobile ? 'mobile' : 'laptop'}`}>
          <div className={`rules-text ${isMobile ? 'mobile' : 'laptop'}`}>📜 Luật chơi:</div>
          <ul>
            <li>🕒 Mỗi câu hỏi có 20 giây để trả lời.</li>
            <li>✅ Chọn đúng sẽ được cộng 10 và điểm thưởng.</li>
            <li>🎁 Trả lời càng nhanh điểm thưởng càng cao.</li>
            <li>❌ Trả lời sai hoặc hết giờ sẽ không được điểm.</li>
            <li>🔚 Khi kết thúc, điểm và bảng xếp hạng sẽ được hiển thị.</li>
          </ul>
        </div>
      </div>

      {/* Khung giới thiệu trượt từ dưới lên */}
      <div className={`inst-drawer ${isMobile ? 'mobile' : 'laptop'} ${showInst ? "show" : ""}`}>
        <div className={`inst-content ${isMobile ? 'mobile' : 'laptop'}`}>
          <div className={`inst-text ${isMobile ? 'mobile' : 'laptop'}`}>📜 Giới thiệu:</div>
          <ul>
            <li>Giới thiệu về Quân khu 7 ...</li>
          </ul>
        </div>
      </div>

      <div className={`login-footer-strip ${isMobile ? 'mobile' : 'laptop'}`}></div>
    </div>
  );
};

export default Login;