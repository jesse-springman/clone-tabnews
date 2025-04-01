const dotenv = require("dotenv");

const nextJest = require("next/jest");

dotenv.config({
  path: ".env.development",
});

const returnNextJest = nextJest({
  dir: ".",
});

const jestConfig = returnNextJest({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
