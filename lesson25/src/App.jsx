import React from "react";
import { Result } from "./components";
import { LocalStorage } from "./utils";
import "./App.css";

export class App extends React.Component {
  constructor(props) {
    super(props);

    const defaultEmojis = ["😀", "😆", "😢", "😍", "😎"];
    const defaultVotes = Array(defaultEmojis.length).fill(0);

    const { votes, emojis, showResult } = LocalStorage.loadData(
      defaultVotes,
      defaultEmojis
    );

    this.state = {
      emojis,
      votes,
      showResult,
    };
  }

  voteHandler(index) {
    if (this.state.showResult) return;

    this.setState(
      (prevState) => {
        const newVotes = [...prevState.votes];
        newVotes[index] += 1;
        return { votes: newVotes };
      },
      () =>
        LocalStorage.saveData(
          this.state.votes,
          this.state.emojis,
          this.state.showResult
        )
    );
  }

  showResultHandler() {
    this.setState({ showResult: true }, () => {
      LocalStorage.saveData(this.state.votes, this.state.emojis, true);
    });
  }

  resetResultHandler() {
    const defaultVotes = Array(this.state.emojis.length).fill(0);
    this.setState({ votes: defaultVotes, showResult: false }, () => {
      LocalStorage.clearData();
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
          {!showResult && (
            <button
              className="show-result-btn"
              onClick={this.showResultHandler.bind(this)}
            >
              Показати результати
            </button>
          )}
          {showResult && (
            <Result
              votes={votes}
              emojis={emojis}
              onReset={this.resetResultHandler.bind(this)}
            />
          )}
        </div>
      </>
    );
  }
}
