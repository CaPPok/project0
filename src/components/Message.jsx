import React, { useEffect, useState, useCallback, useRef } from "react";
import Swal from "sweetalert2"; //thêm cái này nữa m muốn chỉnh j chỉnh
import messageData from "../data/message.json";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Message = ({ onBack, playerName }) => {
  const [message, setMessage] = useState("");
  const suggestions = messageData.map((item) => item.message);
  const [selected, setSelected] = useState(null);

  const handleSubmit = async () => {
    if (!playerName || !message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập lời nhắn và đảm bảo đã đăng nhập.",
      });
      return;
    }

    try {
      await addDoc(collection(db, "leaderboard"), {
        name: playerName,
        time: new Date().toISOString(),
        quizId: "message",
        message: message.trim(),
      });

      //Popup
      Swal.fire({
        icon: "success",
        title: "Đã gửi lời nhắn!",
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then(() => {
        onBack(); // Thoát sau khi người dùng bấm OK
      });
    } catch (error) {
      console.error("Lỗi khi gửi lời nhắn:", error);
      Swal.fire({
        icon: "error",
        title: "Gửi thất bại",
        text: "Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <>
      <div>
        <h2>Gửi lời nhắn của bạn</h2>
        <input
          type="text"
          placeholder="Nhập lời nhắn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="choices-grid">
        {suggestions.map((text, index) => {
          const isSelected = selected === index;
          const className = `choice-button${isSelected ? " selected" : ""}`;

          return (
            <button
              key={index}
              className={className}
              onClick={() => {
                setSelected(index);
                setMessage(text); // Chọn mẫu --> gán vào input
              }}
            >
              {text}
            </button>
          );
        })}
      </div>

      <button
        className="option-button"
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Gửi
      </button>
      <button
        className="option-button"
        style={{ marginTop: "10px" }}
        onClick={onBack}
      >
        Quay lại
      </button>
    </>
  );
};

export default Message;
