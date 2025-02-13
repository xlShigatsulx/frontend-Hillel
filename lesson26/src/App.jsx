import { Result } from "./components";
import { useLocalStorage } from "./hooks";

import "./App.css";

export function App() {
  const [defaultEmojis] = useLocalStorage("emojis", [
    "😀",
    "😆",
    "😢",
    "😍",
    "😎",
  ]);
  const [defaultVotes, setDefaultVotes] = useLocalStorage(
    "votes",
    Array(defaultEmojis.length).fill(0)
  );
  const [showResult, setShowResult] = useLocalStorage("showResult", false);

  function handleVote(index) {
    if (showResult) return;
    setDefaultVotes((prevVotes) => {
      const newVotes = [...prevVotes];
      newVotes[index] += 1;
      return newVotes;
    });
  }

  function resetResults() {
    setDefaultVotes(Array(defaultEmojis.length).fill(0));
    setShowResult(false);
  }

  return (
    <div className="container">
      <h1 className="title">Голосування за найкращий смайлик</h1>
      <div className="btn-group">
        {defaultEmojis.map((emoji, index) => (
          <button key={index} onClick={() => handleVote(index)}>
            {emoji}
          </button>
        ))}
      </div>
      <div className="span-group">
        {defaultVotes.map((count, index) => (
          <span key={index}>{count}</span>
        ))}
      </div>
      {!showResult ? (
        <button className="show-result-btn" onClick={() => setShowResult(true)}>
          Показати результати
        </button>
      ) : (
        <Result
          votes={defaultVotes}
          emojis={defaultEmojis}
          onReset={resetResults}
        />
      )}
    </div>
  );
}
