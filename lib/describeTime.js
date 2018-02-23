const format = require('date-fns').format;

const dateFormat = 'ddd MMMM Do';

const describeTime = (timeString) => {
  const date = new Date(timeString);
  return format(date, dateFormat)
};

module.exports = describeTime;
