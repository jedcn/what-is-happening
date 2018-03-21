const path = require('path');

const loadUserSuppliedConfig = (fileName, loader = require, root = process.cwd()) => {
  let userSuppliedConfigPath;
  if (path.isAbsolute(fileName)) {
    userSuppliedConfigPath = fileName;
  } else {
    userSuppliedConfigPath = path.join(root, fileName);
  }
  return loader(userSuppliedConfigPath);
};

module.exports = loadUserSuppliedConfig;
