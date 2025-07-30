import React, { useState } from "react";
import Login from "./components/Login";
import QuizPage from "./components/QuizPage";
import LeaderboardPage from "./components/LeaderboardPage";
import AdminLogin from "./components/AdminLogin";
import HomePage from "./components/HomePage";
import "./App.css";
import Message from "./components/Message";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [lastScore, setLastScore] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizStatus, setQuizStatus] = useState({});

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
      setPage("home");
    }
  };

  const handleSelectQuiz = async (quizId) => {
    const status = quizStatus[quizId];
    if (status?.done) {
      setSelectedQuizId(quizId);
      setPage("leaderboard");
      return;
    }
    try {
      const data = await import(`./data/${quizId}.json`);
      setQuizData(data.default);
      setSelectedQuizId(quizId);
      setShowResultPage(false);
      setPage("quiz");
    } catch (error) {
      alert("Không thể tải dữ liệu quiz.");
    }
  };

  if (page === "leaderboard") {
    return (
      <LeaderboardPage
        isAdmin={isAdmin}
        onBack={() => {
          if (isAdmin) {
            setIsAdmin(false);
            setPlayerName("");
            setPage("login");
          } else {
            setPage("home");
            setShowResultPage(true);
          }
        }}
        quizId={selectedQuizId}
      />
    );
  }

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

      {page === "home" && (
        <HomePage
          playerName={playerName}
          onSelectQuiz={handleSelectQuiz}
          onLogout={() => {
            setPlayerName("");
            setQuizData(null);
            setSelectedQuizId(null);
            setShowResultPage(false);
            setLastScore(null);
            setQuizStatus({});
            setPage("login");
          }}
          onGratitute={() => {
            setPage("message");
          }}
          quizStatus={quizStatus}
        />
      )}

      {page === "quiz" && quizData && (
        <QuizPage
          playerName={playerName}
          onViewLeaderboard={() => setPage("leaderboard")}
          showResultPage={showResultPage}
          setShowResultPage={setShowResultPage}
          setLastScore={setLastScore}
          lastScore={lastScore}
          quizData={quizData}
          quizId={selectedQuizId}
          setQuizStatus={setQuizStatus}
        />
      )}

      {page === "leaderboard" && (
        <LeaderboardPage
          isAdmin={isAdmin}
          quizId={!isAdmin ? selectedQuizId : null}
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
          onReplay={() => {
            setShowResultPage(false);
            setLastScore(null);
            setPage("quiz");
          }}
        />
      )}
      {page === "message" && (
        <Message
          playerName={playerName}
          onBack={() => {
            setPage("home");
          }}
        />
      )}
    </div>
  );
}

export default App;
