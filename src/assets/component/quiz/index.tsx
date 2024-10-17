import "./style/style.css";
import { quiz } from "../../../data";
import { useState } from "react";

function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleAnswerClick = (variant) => {
    setSelectedAnswer(variant);
    if (variant.isCorrect) {
      setScore(score + quiz.questions[currentQuestion].score);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (isQuizCompleted) {
    return (
      <section className="quiz-section">
        <h2>Quiz Completed!</h2>
        <p>
          Your final score: {score} / {quiz.questions.length * 100}
        </p>
      </section>
    );
  }

  const currentQuizQuestion = quiz.questions[currentQuestion];

  return (
    <section className="quiz-section">
      <h2>{currentQuizQuestion.name}</h2>
      <div className="answer-row">
        {currentQuizQuestion.variants.map((variant) => (
          <div
            key={variant.id}
            className={`answer ${selectedAnswer === variant ? "selected" : ""}`}
            onClick={() => handleAnswerClick(variant)}
          >
            <div className="answer-title">
              {String.fromCharCode(64 + variant.id)}
            </div>
            <span className="answer-text">{variant.name}</span>
          </div>
        ))}
      </div>
      <button
        className="btn"
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
      >
        {currentQuestion < quiz.questions.length - 1
          ? "Next Question"
          : "Finish Quiz"}
      </button>
    </section>
  );
}

export default QuizComponent;
