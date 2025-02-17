import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ term, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "term",
    item: { id, term },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="draggable"
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        margin: "5px",
        background: "#222",
        color: "white",
        cursor: "grab",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      {term}
    </div>
  );
};

export default DraggableItem;
