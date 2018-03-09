const BaseEvent = require('./BaseEvent');

const EventTypeClasses = {
  CreateEvent: require('./CreateEvent'),
  DeleteEvent: require('./DeleteEvent'),
  PullRequestEvent: require('./PullRequestEvent'),
  IssueCommentEvent: require('./IssueCommentEvent'),
  PullRequestReviewCommentEvent: require('./PullRequestReviewCommentEvent'),
  PushEvent: require('./PushEvent'),
  // WatchEvent: 'WatchEvent'
};

const buildEvent = (activityMap, server) => {
  const type = activityMap.get('type');
  const EventClass = EventTypeClasses[type] || BaseEvent;
  const options = {
    server
  };
  return new EventClass(activityMap, options);
};

module.exports = buildEvent;
