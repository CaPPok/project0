import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as XLSX from "xlsx"; // ✅ thêm thư viện export excel

const LeaderboardPage = ({ isAdmin, onBack }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "leaderboard"),
          orderBy("score", "desc"),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setEntries(data);
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // ✅ Hàm export file Excel
  const handleExport = () => {
    const worksheetData = entries.map((entry, index) => ({
      STT: index + 1,
      Tên: entry.name,
      Điểm: entry.score,
      ThờiGian: new Date(entry.time).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Xếp Hạng");

    XLSX.writeFile(workbook, "leaderboard.xlsx");
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">🏆 Bảng xếp hạng</h2>

      {entries.length === 0 ? (
        <p>Vui lòng chờ trong giây lát!</p>
      ) : (
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {index + 1}. {entry.name} – {entry.score} điểm (
              {new Date(entry.time).toLocaleString()})
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Nút export chỉ hiển thị nếu là admin */}
      {isAdmin && (
        <button
          className="option-button"
          onClick={handleExport}
          style={{ marginTop: "15px", backgroundColor: "#4CAF50" }}
        >
          ⬇ Xuất file Excel
        </button>
      )}

      <button
        className="option-button"
        onClick={onBack}
        style={{ marginTop: "20px" }}
      >
        ⬅ Quay lại
      </button>
    </div>
  );
};

export default LeaderboardPage;
