import { useEffect, useMemo, useState } from "react";
import "../styles/RoundOne.css";

const TOTAL_TIME_MS = 15 * 60 * 1000;
const STORAGE_KEY = "round1StartTime";

const formatTime = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const questions = [
  {
    id: 1,
    language: "C",
    title: "C Headers",
    description: "Add the correct header to use printf.",
    code: "___\n\nint main() {\n    printf(\"Hello, Codeathon!\\n\");\n    return 0;\n}",
    options: ["#include <stdio.h>", "#include <stdlib.h>", "#include <string.h>"],
    correctAnswers: ["#include <stdio.h>"],
  },
  {
    id: 2,
    language: "C",
    title: "Loop Condition",
    description: "Complete the for loop condition to print 0 to 4.",
    code: "int i;\nfor (i = 0; ___; i++) {\n    printf(\"%d\\n\", i);\n}",
    options: ["i < 5", "i <= 5", "i > 5"],
    correctAnswers: ["i < 5"],
  },
  {
    id: 3,
    language: "C",
    title: "If Condition",
    description: "Fill the comparison operator to check equality.",
    code: "int score = 10;\nif (score ___ 10) {\n    printf(\"Perfect!\\n\");\n}",
    options: ["==", "!=", ">="],
    correctAnswers: ["=="],
  },
  {
    id: 4,
    language: "C++",
    title: "Main Function",
    description: "Complete the main function signature.",
    code: "___ main() {\n    std::cout << \"Start\" << std::endl;\n    return 0;\n}",
    options: ["int", "void", "char"],
    correctAnswers: ["int"],
  },
  {
    id: 5,
    language: "C++",
    title: "Include Header",
    description: "Add the correct header for std::cout.",
    code: "___\n\nint main() {\n    std::cout << \"Hello\" << std::endl;\n    return 0;\n}",
    options: ["#include <iostream>", "#include <vector>", "#include <map>"],
    correctAnswers: ["#include <iostream>"],
  },
  {
    id: 6,
    language: "C++",
    title: "While Condition",
    description: "Complete the loop to run while count is less than 3.",
    code: "int count = 0;\nwhile (___) {\n    std::cout << count << std::endl;\n    count++;\n}",
    options: ["count < 3", "count > 3", "count == 3"],
    correctAnswers: ["count < 3"],
  },
  {
    id: 7,
    language: "Java",
    title: "Main Method",
    description: "Fill the Java main method signature.",
    code: "public class Main {\n    public static ___ main(String[] args) {\n        System.out.println(\"Ready\");\n    }\n}",
    options: ["void", "int", "String"],
    correctAnswers: ["void"],
  },
  {
    id: 8,
    language: "Java",
    title: "If Else",
    description: "Choose the correct comparison for greater than.",
    code: "int age = 18;\nif (age ___ 17) {\n    System.out.println(\"Adult\");\n}",
    options: [">", "<", "=="],
    correctAnswers: [">"],
  },
  {
    id: 9,
    language: "Java",
    title: "Operator",
    description: "Use the correct operator to add two numbers.",
    code: "int total = 5 ___ 7;",
    options: ["+", "-", "*"],
    correctAnswers: ["+"],
  },
  {
    id: 10,
    language: "C",
    title: "Logical Operator",
    description: "Complete the condition with logical AND.",
    code: "int a = 5;\nint b = 8;\nif (a > 0 ___ b > 0) {\n    printf(\"Both positive\\n\");\n}",
    options: ["&&", "||", "!"],
    correctAnswers: ["&&"],
  },
];

const GamePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filledSlots, setFilledSlots] = useState(
    Array(questions[0].correctAnswers.length).fill("")
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_MS);
  const [isComplete, setIsComplete] = useState(false);
  const [hasTimeExpired, setHasTimeExpired] = useState(false);

  const currentQuestion = questions[currentIndex];

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
        setHasTimeExpired(true);
        return;
      }
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilledSlots(Array(currentQuestion.correctAnswers.length).fill(""));
  }, [currentQuestion.correctAnswers.length, currentIndex]);

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

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragStart = (event, option) => {
    event.dataTransfer.setData("text/plain", option);
    event.dataTransfer.effectAllowed = "move";
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
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="round-one-container">
      <div className="round-one-game">
        <header className="round-one-header">
          <div className="round-one-heading">
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

        {isComplete ? (
          <div className="round-one-complete">
            <h2>Round Complete</h2>
            <p>
              {hasTimeExpired
                ? "Time expired. Your final score is"
                : "Great work! Your final score is"}
            </p>
            <strong>{score.toFixed(1)}</strong>
          </div>
        ) : (
          <>
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
                      {index < currentQuestion.correctAnswers.length && (
                        <span
                          className="round-one-slot"
                          onDrop={(event) => handleDrop(index, event)}
                          onDragOver={handleDragOver}
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
                  draggable
                  onDragStart={(event) => handleDragStart(event, option)}
                >
                  {option}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="round-one-next"
              onClick={handleNext}
            >
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GamePage;
