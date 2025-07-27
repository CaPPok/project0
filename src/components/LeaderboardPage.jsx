/*
Bảng xếp hạng
*/

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as XLSX from "xlsx"; // Thư viện dùng xuất file excel
import "./LeaderboardPage.css"

const LeaderboardPage = ({ isAdmin, onBack, onReplay }) => {
  const [entries, setEntries] = useState([]);

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

  // Hàm export file Excel
  const handleExport = () => {
    const worksheetData = entries.map((entry, index) => ({
      STT: index + 1,
      Tên: entry.name,
      Điểm: entry.score,
      Thời_Gian: new Date(entry.time).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Xếp Hạng");

    XLSX.writeFile(workbook, "Bảng xếp hạng toàn bộ.xlsx");
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-background">
        <h2 className="leaderboard-title">🏆 Bảng xếp hạng</h2>

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
            className="leaderboard-button"
            onClick={handleExport}
            style={{ marginTop: "15px", backgroundColor: "#4CAF50" }}
          >
            ⬇ Xuất file Excel
          </button>
        )}

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
          <button className="leaderboard-button" onClick={onBack}>
            ⬅ Quay lại
          </button>
          {!isAdmin && (
            <button className="leaderboard-button" onClick={onReplay}>
              🔁 Chơi lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
