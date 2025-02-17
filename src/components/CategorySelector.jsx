import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CategorySelector() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [selectedAmount, setSelectedAmount] = useState(5);
  const navigate = useNavigate(); // 👈 Add useNavigate

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleStart = () => {
    if (!selectedCategory) return alert("Please select a category!");

    // Navigate to quiz page with query parameters
    navigate(
      `/quiz?category=${selectedCategory}&difficulty=${selectedDifficulty}&amount=${selectedAmount}`
    );
  };

  return (
    <div className="container text-center">
      <h1 className="text-primary">Welcome to the Quiz App</h1>

      <label className="form-label mt-3">Choose Category:</label>
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label className="form-label mt-3">Select Difficulty:</label>
      <select
        className="form-select"
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label className="form-label mt-3">Number of Questions:</label>
      <select
        className="form-select"
        value={selectedAmount}
        onChange={(e) => setSelectedAmount(e.target.value)}
      >
        {[5, 10, 15, 20].map((num) => (
          <option key={num} value={num}>
            {num} Questions
          </option>
        ))}
      </select>

      <button className="btn btn-success mt-4" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default CategorySelector;
