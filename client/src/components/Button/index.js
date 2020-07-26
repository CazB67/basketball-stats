import React from "react";
import "./style.css";

const Button = (props) => {
  return (
    <div className="text-center">
      <button className="timer mb-3" onClick={props.onClick}>START GAME</button>
      <button className="timer mb-3 ml-2" onClick={props.endClick}>END GAME</button>
    </div>
  );
}

export default Button;

