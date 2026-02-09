import { useNavigate } from "react-router-dom";
import "../styles/RoundOne.css";

const LandingPage1 = () => {
  const navigate = useNavigate();

  return (
    <div className="round-one-container">
      <div className="round-one-card">
        <p className="round-one-eyebrow">Codeathon 2024</p>
        <h1 className="round-one-title">Round 1 – Fix the Code</h1>
        <p className="round-one-description">
          Test your debugging instincts with rapid-fire code snippets. Drag the
          correct tokens into every blank and move fast—your timer starts only
          when you enter the game.
        </p>
        <button
          type="button"
          className="round-one-button"
          onClick={() => navigate("/round1/game")}
        >
          Start Round 1
        </button>
      </div>
    </div>
  );
};

export default LandingPage1;
