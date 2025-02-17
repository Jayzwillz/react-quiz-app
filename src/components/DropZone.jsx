import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ definition, onDrop, matchedTerm, isIncorrect }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "term",
    drop: (item) => onDrop(item, definition),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="dropzone"
      style={{
        padding: "15px",
        margin: "5px",
        minHeight: "50px",
        background: matchedTerm
          ? "#C8F7C5"
          : isIncorrect
          ? "#F7C5C5"
          : isOver
          ? "#ddd"
          : "#EEE",
        border: "2px dashed #999",
        textAlign: "center",
        transition: "background 0.3s ease-in-out",
      }}
    >
      {matchedTerm || definition}
    </div>
  );
};

export default DropZone;
