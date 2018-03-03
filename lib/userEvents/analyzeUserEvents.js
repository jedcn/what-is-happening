
const reportOnUserEvents = require('./reportOnUserEvents');

const analyzeUserEvents = ({ octokit, host, user }) => {
  return octokit.activity.getEventsForUser({
    username: user
  }).then(result => {
    const server = host === 'api.github.com' ? 'github.com' : host;
    return reportOnUserEvents(user, server, result.data);
  });
};

module.exports = analyzeUserEvents;
