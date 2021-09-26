import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import ProgressBar from "./components/ProgressBar";
import "./styles/main.scss";

function App() {
  const [points, setPoints] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userInput, setUserInput] = useState("");
  const [showError, setShowError] = useState(false);
  const answerField = useRef(null);
  const resetButton = useRef(null);
  const pointsNeeded = 10;
  const maxMistakes = 3;

  React.useEffect(() => {
    if (points === pointsNeeded || mistakes === maxMistakes) {
      setTimeout(() => resetButton.current.focus(), 331);
    }
  }, [points, mistakes]);

  function generateNumber(maxValue) {
    return Math.floor(Math.random() * (maxValue + 1));
  }

  function generateProblem() {
    return {
      numberOne: generateNumber(10),
      numberTwo: generateNumber(10),
      operator: ["+", "-", "x"][generateNumber(2)],
    };
  }

  function checkLogic() {
    setUserInput("");
    if (points === pointsNeeded) {
      console.log("You won");
    } else if (mistakes === maxMistakes) {
      console.log("You lost");
    } else {
      setCurrentProblem(generateProblem());
    }
  }

  function resetGame() {
    setPoints(0);
    setMistakes(0);
    setCurrentProblem(generateProblem());
    answerField.current.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    answerField.current.focus();
    const operatorMapping = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      x: (a, b) => a * b,
    };
    const userAnswer = parseInt(userInput);
    const { numberOne, numberTwo, operator } = currentProblem;
    let correctAnswer = operatorMapping[operator](numberOne, numberTwo);

    if (!Number.isNaN(userAnswer)) {
      if (userAnswer === correctAnswer) {
        setPoints(points + 1);
      } else {
        setMistakes(mistakes + 1);
        setShowError(true);
        setTimeout(() => setShowError(false), 500);
      }
      checkLogic();
    } else {
      alert("Input Error! Input must be numeric.");
    }
  }

  return (
    <>
      <div
        className={
          "main-ui" +
          (mistakes === maxMistakes || points === pointsNeeded
            ? " blurred"
            : "")
        }
      >
        <p className={"problem" + (showError ? " animate-wrong" : "")}>
          {currentProblem.numberOne} {currentProblem.operator}{" "}
          {currentProblem.numberTwo}
        </p>
        <form onSubmit={handleSubmit} className="our-form">
          <input
            ref={answerField}
            type="text"
            className="our-field"
            autoComplete="off"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
        <p>
          You have {points} points, you need {pointsNeeded - points} more
          points, and are allowed to make {maxMistakes - mistakes} more
          mistakes.
        </p>
        <ProgressBar score={points} passingScore={pointsNeeded} />
      </div>
      <div
        className={
          "overlay" +
          (mistakes === maxMistakes || points === pointsNeeded
            ? " overlay--visible"
            : "")
        }
      >
        <div className="overlay-inner">
          <p className="end-message">
            {mistakes === maxMistakes
              ? "Sorry, you lost."
              : " Cogratulations! You won."}
          </p>
          <button
            ref={resetButton}
            className="reset-button"
            onClick={resetGame}
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
