import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem";
import DropZone from "./DropZone";

const initialTerms = [
  { id: 1, term: "Variable", definition: "A symbol that represents a value." },
  { id: 2, term: "Constant", definition: "A fixed number that does not change." },
  { id: 3, term: "Equation", definition: "A statement that two expressions are equal." },
  { id: 4, term: "Coefficient", definition: "A number that multiplies a variable." },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MatchingGame = () => {
  const [terms, setTerms] = useState([]);
  const [matches, setMatches] = useState({});
  const [incorrectAttempts, setIncorrectAttempts] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const handleDrop = (item, definition) => {
    if (terms.find((t) => t.term === item.term)?.definition === definition) {
      setMatches((prev) => {
        const newMatches = { ...prev, [definition]: item.term };
        updateScore(newMatches);
        return newMatches;
      });
    } else {
      setIncorrectAttempts((prev) => ({ ...prev, [definition]: true }));
      setTimeout(() => {
        setIncorrectAttempts((prev) => ({ ...prev, [definition]: false }));
      }, 500);
    }
  };

  const updateScore = (newMatches) => {
    setScore(Object.keys(newMatches).length);
  };

  const resetGame = () => {
    setTerms(shuffleArray(initialTerms));
    setMatches({});
    setIncorrectAttempts({});
    setScore(0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="matching-game">
        <h2>Match the Algebraic Terms!</h2>
        <p>Score: {score}/{terms.length}</p>

        {/* Drop Zones */}
        <div className="drop-zones">
          {terms.map(({ definition }) => (
            <DropZone
              key={definition}
              definition={definition}
              onDrop={handleDrop}
              matchedTerm={matches[definition]}
              isIncorrect={incorrectAttempts[definition]}
            />
          ))}
        </div>

        {/* Draggable Items */}
        <div className="draggable-items">
          {terms.map(({ id, term }) => (
            <DraggableItem key={id} id={id} term={term} />
          ))}
        </div>

        <button onClick={resetGame} className="reset-btn">
          Reset Game
        </button>
      </div>
    </DndProvider>
  );
};

export default MatchingGame;
