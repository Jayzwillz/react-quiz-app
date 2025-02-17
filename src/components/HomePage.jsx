import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container container">
      <h1 className="text-primary">Welcome to the Quiz App</h1>
      <p>Select a quiz type to begin:</p>

      <div className="button-group">
        <button className="btn btn-primary" onClick={() => navigate("/multiple-choice")}>
          Multiple-Choice Quiz
        </button>
        <button className="btn btn-success" onClick={() => navigate("/drag-and-drop")}>
          Drag-and-Drop Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
