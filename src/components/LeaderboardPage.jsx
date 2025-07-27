import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as XLSX from "xlsx"; // Thư viện dùng xuất file excel

/*
entries: mảng top 10 bản nghi
fullentries: mảng toàn bộ bản ghi
loading: biến cờ tắt khi đã load xong các mảng 
*/
const LeaderboardPage = ({ isAdmin, onBack }) => {
  const [entries, setEntries] = useState([]);
  const [fullentries, setFullEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "leaderboard"),
          orderBy("score", "desc"),
          orderBy("duration", "asc"),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setEntries(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchFullLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "leaderboard"),
          orderBy("score", "desc"),
          orderBy("duration", "asc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setFullEntries(data);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullLeaderboard();
  }, []);

  // Hàm export file Excel
  const handleExport = () => {
    const worksheetData = fullentries.map((entry, index) => ({
      STT: index + 1,
      Tên: entry.name,
      Điểm: entry.score,
      Thời_Gian_Hoàn_Thành: entry.duration,
      Thời_Gian_Nộp: new Date(entry.time).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Xếp Hạng");

    XLSX.writeFile(workbook, "Bảng xếp hạng toàn bộ.xlsx");
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">🏆 Bảng xếp hạng top 10</h2>

      {entries.length === 0 ? (
        <p>Vui lòng chờ trong giây lát!</p>
      ) : (
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {index + 1}. {entry.name} – {entry.score} điểm ({entry.duration})
            </li>
          ))}
        </ul>
      )}

      {/* Giao diện Export file excel cho admin */}
      {isAdmin && (
        <button
          className="option-button"
          onClick={handleExport}
          style={{
            marginTop: "15px",
            color: "white",
            backgroundColor: loading ? "gray" : "green",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading || fullentries.length === 0}
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
