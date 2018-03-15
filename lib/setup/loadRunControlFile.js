const path = require('path');
const runControlFileName = '.what-is-happeningrc';
const loadRunControlFile = (loader = require('dotenv'), root = process.env.HOME) => {
  const runControlFilePath = path.join(root, runControlFileName);
  const parseResult = loader.load({ path: runControlFilePath });
  return parseResult.parsed;
};

module.exports = loadRunControlFile;
