import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const score = parseInt(searchParams.get("score"), 10) || 0;
  const total = parseInt(searchParams.get("total"), 10) || 0;
  const navigate = useNavigate();

  const percentage = ((score / (total * 5)) * 100).toFixed(2);

  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary">Quiz Completed!</h2>
      <h3 className="mt-3">
        You answered <span className="text-success">{score / 5}</span> out of <span className="text-info">{total}</span> questions correctly.
      </h3>
      <h3>
        Total Points Earned: <span className="text-success">{score}</span> / {total * 5} Points
      </h3>
      <h3>
        Percentage Score: <span className="text-warning">{percentage}%</span>
      </h3>
      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        Go to Home
      </button>
      <button className="btn btn-success mt-4" onClick={() => navigate("/multiple-choice")}>
        Play Again
      </button>
    </div>
  );
};

export default Result;
