/*
Bảng xếp hạng
*/

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as XLSX from "xlsx";
import "./LeaderboardPage.css";

const LeaderboardPage = ({ isAdmin, onBack, quizId }) => {
  const [entries, setEntries] = useState([]);
  const [fullentries, setFullEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState("quiz1");

  const quizzes = [
    { id: "quiz1", title: "Bộ câu hỏi số 1" },
    { id: "quiz2", title: "Bộ câu hỏi số 2" },
  ];

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const q = query(
          collection(db, "leaderboard"),
          where("quizId", "==", quizId),
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

    fetchTop10();
  }, [selectedQuiz, quizId]);

  useEffect(() => {
    const fetchFullLeaderboard = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "leaderboard"),
          where("quizId", "==", selectedQuiz),
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
  }, [selectedQuiz]);

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

    const fileName = `Bang_xep_hang_${selectedQuiz}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-background">
        <h2 className="leaderboard-title">🏆 Bảng xếp hạng top 10</h2>

        {isAdmin && (
          <div className="leaderboard-admin-background">
            <div className="admin-selector">
              <label className="admin-selector-label">Chọn quiz: </label>
              <select
                className="admin-selector-dropdown"
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.target.value)}
              >
                {quizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="leaderboard-admin-button"
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
          </div>
        )}

        {!isAdmin &&
          (entries.length === 0 ? (
            <p>Vui lòng chờ trong giây lát!</p>
          ) : (
            <ul>
              {entries.map((entry, index) => (
                <li key={index}>
                  {index + 1}. {entry.name} – {entry.score} điểm (
                  {entry.duration})
                </li>
              ))}
            </ul>
          ))}

        <div className="leaderboard-button-grid">
          <button
            className="leaderboard-button"
            onClick={onBack}
          >
            ⬅ Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;

