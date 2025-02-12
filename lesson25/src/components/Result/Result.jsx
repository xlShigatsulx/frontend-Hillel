import React from "react";
import "./Result.css";

export class Result extends React.Component {
  render() {
    const { onReset, votes, emojis } = this.props;
    const maxVotes = Math.max(...votes);
    const winners = votes
      .map((votes, index) => (votes === maxVotes ? emojis[index] : null))
      .filter((emoji) => emoji !== null);
    const hasVotes = maxVotes > 0;
    const winnerText = hasVotes ? winners.join(" ") : "❌";
    const winnerVotes = hasVotes ? maxVotes : 0;
    const title = winners.length > 1 ? "Переможці:" : "Переможець:";

    return (
      <>
        <h1>Результати голосування</h1>
        <h4>{title}</h4>
        <span className="winner-span">{winnerText}</span>
        <span>Кількість голосів: {winnerVotes}</span>
        <button className="reset-btn" onClick={onReset}>
          Скинути результати
        </button>
      </>
    );
  }
}
