const BaseEvent = require('../userEvents/BaseEvent');

const EventTypeClasses = {
  CreateEvent: require('../userEvents/CreateEvent'),
  DeleteEvent: require('../userEvents/DeleteEvent'),
  PullRequestEvent: require('../userEvents/PullRequestEvent'),
  IssueCommentEvent: require('../userEvents/IssueCommentEvent'),
  PullRequestReviewCommentEvent: require('../userEvents/PullRequestReviewCommentEvent'),
  PushEvent: require('../userEvents/PushEvent'),
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
