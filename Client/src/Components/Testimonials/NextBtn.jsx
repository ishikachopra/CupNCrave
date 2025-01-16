import React from "react";

const NextBtn = (props) => {
  const { className, onClick, icon } = props; // Destructure icon
  return (
    <div className={className} onClick={onClick} style={{ cursor: "pointer" }}>
      <i
        className={icon}
        style={{ color: "#994d47", fontSize: "30px" }}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default NextBtn;

