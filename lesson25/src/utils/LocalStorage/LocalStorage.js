export class LocalStorage {
  static KEYS = ["votes", "emojis", "showResult"];

  static saveData(data) {
    this.KEYS.forEach((key) => {
      if (key in data) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
    });
  }

  static loadData(defaults) {
    return this.KEYS.reduce((acc, key) => {
      const savedValue = localStorage.getItem(key);
      acc[key] = savedValue ? JSON.parse(savedValue) : defaults[key] ?? false;
      return acc;
    }, {});
  }

  static clearData() {
    this.KEYS.forEach((key) => localStorage.removeItem(key));
  }
}
