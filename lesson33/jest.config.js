export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/test_utils/setupTest.js"],
  rootDir: "./",
  moduleNameMapper: {
    "^@components$": "<rootDir>/src/components/$1",
    "^@ui$": "<rootDir>/src/components/UI/$1",
    "^@context$": "<rootDir>/src/context/$1",
    "^@pages$": "<rootDir>/src/pages/$1",
    "^@services$": "<rootDir>/src/services/$1",
    "^@ducks$": "<rootDir>/src/ducks/$1",
    "^@store$": "<rootDir>/src/store/$1",
    "^@api$": "<rootDir>/src/api/$1",
    "^@scripts$": "<rootDir>/src/scripts/$1",
    "\\.module\\.scss$": "identity-obj-proxy",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
};
