const fromJS = require('immutable').fromJS;

const fetchUserEvents = ({ octokit, user }) => {
  return octokit.activity.getEventsForUser({
    username: user
  }).then((result) => fromJS(result.data));
};

module.exports = fetchUserEvents;
