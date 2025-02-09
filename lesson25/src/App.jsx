import React from "react";
import { Result } from "./components";
import "./App.css";

export class App extends React.Component {
  state = {
    emojis: ["😀", "😆", "😢", "😍", "😎"],
    votes: [0, 0, 0, 0, 0],
    showResult: false,
  };

  voteHandler(index) {
    if (this.state.showResult) return;
    this.setState((prevState) => {
      const newVotes = [...prevState.votes];
      newVotes[index] += 1;
      return { votes: newVotes };
    });
  }

  showResultHandler() {
    this.setState(() => ({
      showResult: true,
    }));
  }

  resetResultHandler() {
    this.setState({
      votes: [0, 0, 0, 0, 0],
      showResult: false,
    });
  }

  render() {
    const { votes, showResult, emojis } = this.state;
    return (
      <>
        <div className="container">
          <h1 className="title">Голосування за найкращий смайлик</h1>
          <div className="btn-group">
            {emojis.map((emoji, index) => (
              <button key={index} onClick={() => this.voteHandler(index)}>
                {emoji}
              </button>
            ))}
          </div>
          <div className="span-group">
            {votes.map((count, index) => (
              <span key={index}>{count}</span>
            ))}
          </div>
          <button
            className="show-result-btn"
            onClick={this.showResultHandler.bind(this)}
          >
            Показати результати
          </button>
          {showResult && (
            <>
              <Result
                votes={votes}
                emojis={emojis}
                onReset={this.resetResultHandler.bind(this)}
              />
            </>
          )}
        </div>
      </>
    );
  }
}
