const { format } = require('date-fns');

const timeFormat = 'h:mm a';

const describeHourOfDay = (timeString) => {
  const date = new Date(timeString);
  return format(date, timeFormat)
};

module.exports = describeHourOfDay;



