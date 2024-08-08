// jest.config.js
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js"],
  testMatch: ["**/__tests__/**/*.js"],
  moduleDirectories: ["node_modules", "src"],
};
