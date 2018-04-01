const format = require('date-fns').format;

const dateFormat = 'dddd[,] MMMM Do h:mm a';
const describeTime = (timeString) => {
  const date = new Date(timeString);
  return format(date, dateFormat)
};

module.exports = describeTime;
