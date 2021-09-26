import React from "react";

function ProgressBar({ score, passingScore }) {
  return (
    <div className="progress">
      <div className="boxes">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div
        className="progress-inner"
        style={{ transform: `scaleX(${score / passingScore})` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
