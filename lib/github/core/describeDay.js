const format = require('date-fns').format;

const dayFormat = 'dddd MMMM Do';
const describeDay = (timeString) => {
  const date = new Date(timeString);
  return format(date, dayFormat)
};

module.exports = describeDay;
