
const reportOnEvents = require('./reportOnEvents');

const analyzeUserEvents = ({ octokit, host, username }) => {
  return octokit.activity.getEventsForUser({
    username
  }).then(result => {
    const server = host === 'api.github.com' ? 'github.com' : host;
    return reportOnEvents(username, server, result.data);
  });
};

module.exports = analyzeUserEvents;
