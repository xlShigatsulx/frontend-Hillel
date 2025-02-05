import chalk from "chalk";

export class Logger {
  static info(...args) {
    console.log(chalk.green(`[INFO]:[${new Date().toISOString()}] `, ...args));
  }

  static warn(...args) {
    console.log(chalk.yellow(`[WARN]:[${new Date().toISOString()}] `, ...args));
  }

  static error(...args) {
    console.log(chalk.red(`[ERROR]:[${new Date().toISOString()}] `, ...args));
  }
}
