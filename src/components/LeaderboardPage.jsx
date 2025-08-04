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
    { id: "message", title: "Lời chúc" },
  ];

  //Lấy top 10 hiển thị trong user mode
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
        if (selectedQuiz === "message") {
          const q = query(
            collection(db, "leaderboard"),
            where("quizId", "==", selectedQuiz),
            orderBy("time", "asc")
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => doc.data());
          setFullEntries(data);
        } else {
          const q = query(
            collection(db, "leaderboard"),
            where("quizId", "==", selectedQuiz),
            orderBy("score", "desc"),
            orderBy("duration", "asc")
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => doc.data());
          setFullEntries(data);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullLeaderboard();
  }, [selectedQuiz]);

  // Hàm xóa dòng trống trong file .xlsx mỗi khi người dùng xuống dòng
  const cleanHTML = (html) => {
    if (!html) return "";
    return html
      .replace(/<p><br><\/p>/g, "")
      .replace(/<p>(.*?)<\/p>/g, "$1<br>")
      .replace(/<br>\s*<br>/g, "<br>");
  };

  // Hàm định dạng hiển thị thời gian
  const formatDateCustom = (isoString) => {
    const date = new Date(isoString);
    const pad = (n) => n.toString().padStart(2, "0");

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  const handleExport = () => {
    if (selectedQuiz === "message") {
      // Giữ nguyên các định dạng văn bản của người dùng rồi xuất ra file      
      /* Lập bảng trong Excel:
      1. Cột 1: STT
      2. Cột 2: Tên người gửi
      3. Cột 3: Lời nhắn (hàm cleanHTML để xử lý dòng trống)
      4. Cột 4: Thời gian (hàm formatDateCustom để định dạng hiển thị)
      */
      const htmlRows = fullentries.map((entry, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${entry.name}</td>
          <td>${cleanHTML(entry.message)}</td>
          <td>${formatDateCustom(entry.time)}</td>
        </tr>
      `).join("");
      
      /*
      Tạo file html để chứa bảng dữ liệu
      */
      const html = `
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #888; padding: 8px; vertical-align: top; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Lời chúc</th>
                <th>Thời gian nộp</th>
              </tr>
            </thead>
            <tbody>
              ${htmlRows}
            </tbody>
          </table>
        </body>
        </html>
      `;

      // Xuất thành file .xlsx với định dạng Excel
      const blob = new Blob([html], { type: "application/vnd.ms-excel" }); // Excel có thể mở file này như bảng tính.
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Danh_sach_loi_chuc.xls";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
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
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-background">
        <h2 className="leaderboard-title">
          {isAdmin ? "📊 Xuất file Excel" : "🏆 Bảng xếp hạng top 10"}
        </h2>

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
            <div style={{textAlign: "center"}}>Vui lòng chờ trong giây lát!</div>
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
          <button className="leaderboard-button" onClick={onBack}>
            ⬅ Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
