import React, { useState } from "react";
import Login from "./components/Login";
import QuizPage from "./components/QuizPage";
import LeaderboardPage from "./components/LederboardPage";
import "./App.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false); // ✅ thêm state
  const [lastScore, setLastScore] = useState(null);

  if (showLeaderboard) {
    return (
      <LeaderboardPage
        onBack={() => {
          setShowLeaderboard(false);
          setShowResultPage(true); // ✅ quay về kết quả
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      {playerName === "" ? (
        <Login onStart={(name) => setPlayerName(name)} />
      ) : (
        <QuizPage
          playerName={playerName}
          onViewLeaderboard={() => setShowLeaderboard(true)}
          showResultPage={showResultPage} // ✅ truyền xuống
          setShowResultPage={setShowResultPage} // ✅ truyền xuống để reset khi cần
          setLastScore={setLastScore}
          lastScore = {lastScore}
        />
      )}
    </div>
  );
}

export default App;

