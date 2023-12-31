import React from "react";

function MyButton({ text, type, onClick }) {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button className={`MyButton MyButton_${btnType}`} onClick={onClick}>
      {text}
    </button>
  );
}

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
