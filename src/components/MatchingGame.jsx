import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem";
import DropZone from "./DropZone";

import correctSound from "./sounds/correct.mp3";
import incorrectSound from "./sounds/incorrect.mp3";
import gameOverSound from "./sounds/gameover.mp3";

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
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setGameOver(true);
      playSound(gameOverSound);
    }
  }, [timer]);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleDrop = (item, definition) => {
    if (gameOver) return; // Prevent interaction after time runs out

    if (terms.find((t) => t.term === item.term)?.definition === definition) {
      playSound(correctSound);
      setMatches((prev) => {
        const newMatches = { ...prev, [definition]: item.term };
        updateScore(newMatches);
        return newMatches;
      });
    } else {
      playSound(incorrectSound);
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
    setTimer(60);
    setGameOver(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="matching-game">
        <h2>Match the Algebraic Terms!</h2>
        <p>Score: {score}/{terms.length}</p>
        <h3>Time Left: {timer}s</h3>

        {gameOver && <h3 style={{ color: "red" }}>Time's Up! Game Over!</h3>}

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

        {/* Draggable Items - Disabled if gameOver is true */}
        <div className="draggable-items" style={{ pointerEvents: gameOver ? "none" : "auto" }}>
          {terms.map(({ id, term }) => (
            <DraggableItem key={id} id={id} term={term} />
          ))}
        </div>

        <button onClick={resetGame} className="reset-btn">
          Restart Game
        </button>
      </div>
    </DndProvider>
  );
};

export default MatchingGame;
