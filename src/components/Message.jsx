import React, { useEffect, useState, useCallback, useRef } from "react";
import Swal from "sweetalert2"; //thêm cái này nữa m muốn chỉnh j chỉnh
import messageData from "../data/message.json";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Message.css"
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Message = ({ onBack, playerName }) => {
  const suggestions = messageData.map((item) => item.message);
  const [selected, setSelected] = useState(null);
  const editorRef = useRef(null); // Sử dụng để tạo khung văn bản dựa vào thư viện quill
  const quillRef = useRef(null); // Sử dụng để tạo khung văn bản dựa vào thư viện quill
  const [previousText, setPreviousText] = useState(""); // Lưu mẫu câu trước khi random
  const [currentText, setCurrentText] = useState("");   // Theo dõi mẫu câu hiện tại

  // Tạo khung văn bản
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Nhập lời nhắn của bạn vào đây...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ color: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  const handleRandom = () => {
    const quill = quillRef.current;
    if (!quill) return;

    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const randomText = suggestions[randomIndex];

    setPreviousText(currentText); // lưu lại trước khi random
    setCurrentText(randomText);   // lưu cái mới để theo dõi

    quill.setText(randomText); // gán vào khung nhập
  };

  const handleUndo = () => {
    const quill = quillRef.current;
    if (!quill || !previousText) return;

    setCurrentText(previousText); // quay lại câu trước
    setPreviousText("");          // reset lại
    quill.setText(previousText);
  };

  const handleSubmit = async () => {
    const quill = quillRef.current;
    const contentHTML = quill.root.innerHTML;
    const contentText = quill.getText();

    if (!playerName || !contentText.trim()) {
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
        message: contentHTML.trim(),
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
    <main className="mess-container">
      <div className="mess-background">
        <div className="mess-title">GỬI LỜI NHẮN CỦA RIÊNG BẠN</div>

        {/* Quill Editor */}
        <div
          ref={editorRef}
          style={{
            height: "30vh",
            marginBottom: "1vh",
            backgroundColor: "#ffffff",
          }}
        />

        <div className="choices-grid">
          <button className="choice-button" onClick={handleRandom}>Ngẫu nhiên</button>
          <button className="choice-button" onClick={handleUndo}>Đổi lại</button>
        </div>

        <button
          className="mess-button"
          onClick={handleSubmit}
        >
          Gửi
        </button>
        <button
          className="mess-button"
          onClick={onBack}
        >
          Quay lại
        </button>
      </div>
    </main>
  );
};

export default Message;
