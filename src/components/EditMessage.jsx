import React from "react";

const EditMessage = ({ textRef, nodeName, setNodeName }) => {
  return (
    <div className="updatenode__controls">
      <label>Text</label>
      <textarea
        ref={textRef}
        value={nodeName}
        onChange={(evt) => setNodeName(evt.target.value)}
      />
    </div>
  );
};

export default EditMessage;
