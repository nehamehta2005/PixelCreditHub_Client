import React from "react";
import "./Button.css";
 
function Button({  buttonText, className, onClick }) {
  return  <div className={`ButtonComponent ${className}`}  onClick={onClick}>
  {buttonText}
</div>
}

export default Button;
