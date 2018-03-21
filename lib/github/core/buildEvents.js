const BaseEvent = require('../userEvents/BaseEvent');

const EventTypeClasses = {
  CreateEvent: require('../userEvents/CreateEvent'),
  DeleteEvent: require('../userEvents/DeleteEvent'),
  PullRequestEvent: require('../userEvents/PullRequestEvent'),
  IssueCommentEvent: require('../userEvents/IssueCommentEvent'),
  IssuesEvent: require('../userEvents/IssuesEvent'),
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

const createEventObjects = (listOfMaps, server) => {
  return listOfMaps.map((map) => {
    return buildEvent(map, server);
  });
};

const buildEvents = ({ host, userEventsData }) => {
  const server = host === 'api.github.com' ? 'github.com' : host;
  return createEventObjects(userEventsData, server);
};

module.exports = buildEvents;
