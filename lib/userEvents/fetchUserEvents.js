const fetchUserEvents = ({ octokit, user }) => {
  return octokit.activity.getEventsForUser({
    username: user
  });
};

module.exports = fetchUserEvents;
