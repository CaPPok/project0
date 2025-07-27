import React, { useState } from "react";
import Login from "./components/Login";
import QuizPage from "./components/QuizPage";
import LeaderboardPage from "./components/LeaderboardPage";
import AdminLogin from "./components/AdminLogin";
import "./App.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [lastScore, setLastScore] = useState(null);

  //Biến dành cho admin login
  const [page, setPage] = useState("login");
  const [isAdmin, setIsAdmin] = useState(false);

  if (showLeaderboard) {
    return (
      <LeaderboardPage
        onBack={() => {
          setShowLeaderboard(false);
          setShowResultPage(true);
        }}
      />
    );
  }

  const handleStart = (name) => {
    if (name === "admink23") {
      setPage("adminLogin");
    } else {
      setPlayerName(name);
      setIsAdmin(false);
      setPage("quiz");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      {page === "login" && <Login onStart={handleStart} />}

      {page === "adminLogin" && (
        <AdminLogin
          onLoginSuccess={(adminStatus) => {
            setIsAdmin(adminStatus);
            setPlayerName("Admin");
            setPage("leaderboard");
          }}
          onBack={() => {
            setPage("login");
            setIsAdmin(false);
          }}
        />
      )}

      {page === "quiz" && (
        <QuizPage
          playerName={playerName}
          onViewLeaderboard={() => setPage("leaderboard")}
          showResultPage={showResultPage}
          setShowResultPage={setShowResultPage}
          setLastScore={setLastScore}
          lastScore={lastScore}
        />
      )}

      {page === "leaderboard" && (
        <LeaderboardPage
          isAdmin={isAdmin}
          onBack={() => {
            if (isAdmin) {
              setIsAdmin(false);
              setPlayerName("");
              setPage("login");
            } else {
              setPage("quiz");
              setShowResultPage(true);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
