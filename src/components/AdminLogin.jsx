import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AdminLogin = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hadleLogin = async () => {
    try {
      const userInfor = await signInWithEmailAndPassword(auth, email, password);
      const user = userInfor.user;

      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
      console.log("Admin email (env):", adminEmail);
      console.log("Đang nhập:", user.email);

      if (user.email === adminEmail) {
        onLoginSuccess(true);
      } else {
        alert("Tài khoản không có quyền admin.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">Đăng nhập Admin</h2>
      <input
        type="email"
        placeholder="Email admin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="admin-input"
      />
      <button className="option-button" onClick={hadleLogin}>
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
