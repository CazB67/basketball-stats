import React from "react";
import "./style.css";

const Button = (props) => {
  
  return (
    
    <div className="text-center">
      <button className={props.visibilityStart}  onClick={props.onClick}>START GAME</button>
      <button className={props.visibilityEnd} onClick={props.endClick}>END GAME</button>
    </div>
    
  );
}

export default Button;

