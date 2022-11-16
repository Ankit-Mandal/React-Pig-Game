import { useState, useEffect } from "react";
import Player from "./components/player/Player";
import "./App.css";

const App = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState({ 0: false, 1: false });

  const [totalScores, setTotalScores] = useState({ 0: 0, 1: 0 });
  const [currentScores, setCurrentScores] = useState({ 0: 0, 1: 0 });

  const [activePlayer, setActivePlayer] = useState(0);
  const [activeStatus, setActiveStatus] = useState({ 0: true, 1: false });

  const [currentDice, setCurrentDice] = useState(1);
  const [isDiceVisible, setIsDiceVisible] = useState(false);

  const initialActions = () => {
    setIsGameOver(false);
    setIsWinner({ 0: false, 1: false });

    setTotalScores({ 0: 0, 1: 0 });
    setCurrentScores({ 0: 0, 1: 0 });

    setActivePlayer(0);
    setActiveStatus({ 0: true, 1: false });

    setCurrentDice(1);
    setIsDiceVisible(false);
  };

  useEffect(() => {
    initialActions();
  }, []);

  const switchPlayer = () => {
    setCurrentScores({ 0: 0, 1: 0 });
    setActiveStatus((prevStatus) => ({
      ...prevStatus,
      [activePlayer]: false,
      [1 - activePlayer]: true,
    }));
    setActivePlayer((prevPlayer) => 1 - prevPlayer);
  };

  const newButtonHandler = () => {
    initialActions();
  };

  const rollButtonHandler = () => {
    if (!isGameOver) {
      // 1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;

      // 2. Display dice
      setIsDiceVisible(true);
      setCurrentDice(dice);

      // 3. Check for rolled 1
      if (dice !== 1) {
        // Add dice to current score
        const newCurrentScore = currentScores[activePlayer] + dice;
        setCurrentScores((prevScores) => ({
          ...prevScores,
          [activePlayer]: newCurrentScore,
        }));
      } else {
        // Switch to next player
        switchPlayer();
      }
    }
  };

  const holdButtonHandler = () => {
    if (!isGameOver) {
      // 1. Add current score to active player's score
      const newTotalScore =
        totalScores[activePlayer] + currentScores[activePlayer];
      setTotalScores((prevScores) => ({
        ...prevScores,
        [activePlayer]: newTotalScore,
      }));
      // console.log(newTotalScore);
      // console.log(totalScores);

      // 2. Check if player's score is >= 100
      // if (totalScores[activePlayer] >= 100) {
      if (newTotalScore >= 100) {
        // Finish the game
        setIsGameOver(true);
        setIsDiceVisible(false);

        setIsWinner((prevStatus) => ({ ...prevStatus, [activePlayer]: true }));
        setActiveStatus({ 0: false, 1: false });
      } else {
        // Switch to the next player
        switchPlayer();
      }
    }
  };

  return (
    <main className="App">
      <Player
        playerId={1}
        isActive={activeStatus[0]}
        totalScore={totalScores[0]}
        currentScore={currentScores[0]}
        isWinner={isWinner[0]}
      />
      <Player
        playerId={2}
        isActive={activeStatus[1]}
        totalScore={totalScores[1]}
        currentScore={currentScores[1]}
        isWinner={isWinner[1]}
      />
      <img
        src={`dice-${currentDice}.png`}
        alt="Playing dice"
        className={`dice ${isDiceVisible ? "" : "hidden"}`}
      />
      <button className="btn btn--new" onClick={newButtonHandler}>
        🔄 New game
      </button>
      <button className="btn btn--roll" onClick={rollButtonHandler}>
        🎲 Roll dice
      </button>
      <button className="btn btn--hold" onClick={holdButtonHandler}>
        📥 Hold
      </button>
    </main>
  );
};

export default App;
