import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebaseConfig"; // import kết nối firestore

const LeaderboardPage = ({ onBack }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Truy vấn dữ liệu từ collection "leaderboard", sắp xếp theo score giảm dần
        const q = query(
          collection(db, "leaderboard"),
          orderBy("score", "desc"),
          limit(10) // Lấy top 10
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

  return (
    <div className="quiz-container">
      <h2 className="question-title">🏆 Bảng xếp hạng toàn quốc</h2>
      {entries.length === 0 ? (
        <p>Không có dữ liệu nào!</p>
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
