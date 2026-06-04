import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RoundOne.css";

const LandingPage1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("studentData");
    if (!user) {
      navigate("/register");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("studentData") || "null");

  return (
    <div className="round-one-container">
      <div className="round-one-card">
        <p className="round-one-eyebrow">Codeathon 2026</p>
        <h1 className="round-one-title">Round 1 – Fix the Code</h1>
        {user && (
          <p className="round-one-welcome">
            Welcome, <strong>{user.name}</strong>! Ready to compete?
          </p>
        )}
        <p className="round-one-description">
          Test your debugging instincts with rapid-fire code snippets across C,
          C++, and Java. Drag the correct tokens into every blank and move
          fast — you have <strong>15 minutes</strong> once the game begins.
          Your timer starts the moment you click Start.
        </p>
        <ul className="round-one-rules">
          <li>⏱ 15 minutes total for all 10 questions</li>
          <li>🎯 Each correct answer earns 1 point</li>
          <li>🚫 Timer cannot be paused once started</li>
          <li>💡 Drag options into the blank slots</li>
        </ul>
        <button
          type="button"
          className="round-one-button"
          onClick={() => navigate("/round1/game")}
        >
          Start Round 1 →
        </button>
      </div>
    </div>
  );
};

export default LandingPage1;
