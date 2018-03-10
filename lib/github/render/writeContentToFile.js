const fs = require('fs');

const writeContentToFile = (content, fileName) => {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
  });
};

module.exports = writeContentToFile;
