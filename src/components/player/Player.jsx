import React from "react";
import "./player.css";

const Player = ({ playerId, isActive, totalScore, currentScore, isWinner }) => {
  const active = isActive ? "player--active" : "";
  const winner = isWinner ? "player--winner" : "";

  return (
    <section className={`player player--0 ${active} ${winner}`}>
      <h2 className="name" id="name--0">
        Player {playerId}
      </h2>
      <p className="score" id="score--0">
        {totalScore}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id="current--0">
          {currentScore}
        </p>
      </div>
    </section>
  );
};

export default Player;
