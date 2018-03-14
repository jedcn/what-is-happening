const pluralize = (number, item) => {
  if (number === 1) {
    return `${number} ${item}`;
  }
  return `${number} ${item}s`;
};

module.exports = pluralize;
