import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract settings from URL
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const amount = searchParams.get("amount");

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => ({
          question: question.question,
          correctAnswer: question.correct_answer,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, [category, difficulty, amount]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);

    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 5);
      setEarnedPoints(5);
    } else {
      setEarnedPoints(0);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setEarnedPoints(0);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      navigate(`/result?score=${score}&total=${questions.length}`); // Redirect to result page
    }
  };

  if (loading) return <h2>Loading Questions...</h2>;
  if (!questions.length) return <h2>Error loading questions. Try again later.</h2>;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container text-center">
      {/* Progress Bar */}
      <div className="progress mb-3" style={{ height: "25px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Display Question Number */}
      <h4 className="text-secondary">Question {currentQuestionIndex + 1} of {questions.length}</h4>

      <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />

      <ul className="list-unstyled">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <li key={index}>
            <button
              className={`btn m-2 ${
                selectedOption
                  ? option === questions[currentQuestionIndex].correctAnswer
                    ? "btn-success"
                    : option === selectedOption
                    ? "btn-danger"
                    : "btn-outline-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handleSelectOption(option)}
              disabled={showAnswer}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          </li>
        ))}
      </ul>

      {showAnswer && (
        <div className="mt-3">
          <p className="text-info">
            Correct Answer:{" "}
            <span className="fw-bold" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].correctAnswer }} />
          </p>
          <p className={`fw-bold ${earnedPoints > 0 ? "text-success" : "text-danger"}`}>
            {earnedPoints > 0 ? `+${earnedPoints} Points! 🎉` : "No points earned 😞"}
          </p>
        </div>
      )}

      <div className="mt-3">
        <h4>Current Score: <span className="text-primary">{score} Points</span></h4>
      </div>

      <button className="btn btn-success mt-3" onClick={handleNextQuestion} disabled={!showAnswer}>
        {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
      </button>

      {/* Go Back to Home Button */}
      <button className="btn btn-danger mt-3" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
}

export default Quiz;
