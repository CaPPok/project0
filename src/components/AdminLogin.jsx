import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AdminLogin = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Xử lý phần đăng nhập admin
  const handleLogin = async () => {
    try {
      const userInfor = await signInWithEmailAndPassword(auth, email, password);
      const user = userInfor.user;

      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

      if (user.email === adminEmail) {
        onLoginSuccess(true);
      }
      //Phần này phát triển khi có nhiều role khác
      // else {
      //   alert("Tài khoản không có quyền admin.");
      // }
    } catch (error) {
      alert("Email đăng nhập hoặc mật khẩu chưa đúng!");
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">Đăng nhập Admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="admin-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="option-button" onClick={handleLogin}>
        Đăng nhập
      </button>
      <button
        className="option-button"
        style={{ marginTop: "10px" }}
        onClick={onBack}
      >
        Quay lại
      </button>
    </div>
  );
};
export default AdminLogin;
