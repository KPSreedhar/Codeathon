import { useEffect, useMemo, useRef, useState } from "react";
import questions from "../data/questions";
import "../styles/RoundOne.css";

const TOTAL_TIME_MS = 15 * 60 * 1000;
const STORAGE_KEY = "round1StartTime";

const formatTime = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const GamePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filledSlots, setFilledSlots] = useState(
    Array(questions[0].slots).fill("")
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_MS);
  const [isComplete, setIsComplete] = useState(false);
  const scoreRef = useRef(score);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    const interval = setInterval(() => {
      const start = Number(localStorage.getItem(STORAGE_KEY));
      const elapsed = Date.now() - start;
      const remaining = TOTAL_TIME_MS - elapsed;
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setIsComplete(true);
        alert(`Time's up! Your final score is ${scoreRef.current}.`);
        return;
      }
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilledSlots(Array(currentQuestion.slots).fill(""));
  }, [currentQuestion.slots, currentIndex]);

  const codeSegments = useMemo(
    () => currentQuestion.code.split("___"),
    [currentQuestion.code]
  );

  const handleDrop = (slotIndex, event) => {
    event.preventDefault();
    const value = event.dataTransfer.getData("text/plain");
    if (!value) return;
    setFilledSlots((prev) => {
      const updated = [...prev];
      updated[slotIndex] = value;
      return updated;
    });
  };

  const handleNext = () => {
    const points = filledSlots.reduce((total, value, index) => {
      if (value === currentQuestion.correctAnswers[index]) {
        return total + 0.5;
      }
      return total;
    }, 0);

    const updatedScore = score + points;
    setScore(updatedScore);

    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
      localStorage.removeItem(STORAGE_KEY);
      alert(`Round complete! Your final score is ${updatedScore}.`);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="round-one-container">
      <div className="round-one-game">
        <header className="round-one-header">
          <div>
            <p className="round-one-eyebrow">Codeathon 2024</p>
            <h1 className="round-one-title">Round 1 – Fix the Code</h1>
          </div>
          <div className="round-one-timer">
            <span>Time Left</span>
            <strong>{formatTime(timeLeft)}</strong>
          </div>
        </header>

        <div className="round-one-progress">
          <div
            className="round-one-progress-fill"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="round-one-question-meta">
          <p>
            Question {currentIndex + 1} / {questions.length}
          </p>
          <h2>{currentQuestion.title}</h2>
          <span>{currentQuestion.description}</span>
        </div>

        <div className="round-one-code-box">
          <pre>
            <code>
              {codeSegments.map((segment, index) => (
                <span key={`segment-${index}`}>
                  {segment}
                  {index < currentQuestion.slots && (
                    <span
                      className="round-one-slot"
                      onDrop={(event) => handleDrop(index, event)}
                      onDragOver={(event) => event.preventDefault()}
                    >
                      {filledSlots[index] || "Drop here"}
                    </span>
                  )}
                </span>
              ))}
            </code>
          </pre>
        </div>

        <div className="round-one-options">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className="round-one-option"
              draggable={!isComplete}
              onDragStart={(event) =>
                event.dataTransfer.setData("text/plain", option)
              }
            >
              {option}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="round-one-next"
          onClick={handleNext}
          disabled={isComplete}
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default GamePage;
