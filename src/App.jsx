// src/App.jsx
import React, { useState } from "react";
import Login from "./components/Login";
import QuizPage from "./components/QuizPage";
import "./App.css"

function App() {
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      {playerName === "" ? (
        <Login onStart={(name) => setPlayerName(name)} />
      ) : (
        <QuizPage playerName={playerName} />
      )}
    </div>
  );
}

export default App;

