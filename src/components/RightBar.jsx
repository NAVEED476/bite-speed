import React from "react";
import EditMessage from "./EditMessage";

const RightBar = ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      {isSelected ? (
        <EditMessage textRef={textRef} nodeName={nodeName} setNodeName={setNodeName} />
      ) : (
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "node", "message")}
          draggable
        >
          Message
        </div>
      )}
    </aside>
  );
};

export default RightBar;
