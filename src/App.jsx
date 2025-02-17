import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategorySelector from "./components/CategorySelector";
import MatchingGame from "./components/MatchingGame";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./styles.css";  // ✅ Import the new CSS file

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/multiple-choice" element={<CategorySelector />} />
        <Route path="/drag-and-drop" element={<MatchingGame />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
