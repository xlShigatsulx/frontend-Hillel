export class LocalStorage {
  static saveData(votes, emojis, showResult) {
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("emojis", JSON.stringify(emojis));
    localStorage.setItem("showResult", JSON.stringify(showResult));
  }

  static loadData(defaultVotes, defaultEmojis) {
    const savedVotes = localStorage.getItem("votes");
    const savedEmojis = localStorage.getItem("emojis");
    const savedShowResult = localStorage.getItem("showResult");
    return {
      votes: savedVotes ? JSON.parse(savedVotes) : defaultVotes,
      emojis: savedEmojis ? JSON.parse(savedEmojis) : defaultEmojis,
      showResult: savedShowResult ? JSON.parse(savedShowResult) : false,
    };
  }

  static clearData() {
    localStorage.removeItem("votes");
    localStorage.removeItem("emojis");
    localStorage.removeItem("showResult");
  }
}
