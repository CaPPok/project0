/*
Chế độ Admin
*/

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./AdminLogin.css"

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
    <div className="admin-container">
      <div className="admin-background">
        <h2 className="admin-title">Đăng nhập Admin</h2>
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
          className="admin-input"
        />
        <div className="admin-button-grid">
          <button className="admin-button" onClick={handleLogin}>
            Đăng nhập
          </button>
          <button className="admin-button" onClick={onBack}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
