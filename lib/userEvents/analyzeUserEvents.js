
const reportOnUserEvents = require('./reportOnUserEvents');

const analyzeUserEvents = ({ octokit, host, username }) => {
  return octokit.activity.getEventsForUser({
    username
  }).then(result => {
    const server = host === 'api.github.com' ? 'github.com' : host;
    return reportOnUserEvents(username, server, result.data);
  });
};

module.exports = analyzeUserEvents;
