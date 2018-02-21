
const format = require('date-fns').format;

const dateFormat = 'dddd MMMM Do';

const describeTime = (timeString) => {
  const date = new Date(timeString);
  return format(date, dateFormat)
};

const describeActor = (actor) => actor.login;

const describeRepo = (repo) => repo.name;

const EventTypes = {
  CreateEvent: 'CreateEvent',
  DeleteEvent: 'DeleteEvent',
  PullRequestEvent: 'PullRequestEvent',
  PullRequestReviewCommentEvent: 'PullRequestReviewCommentEvent',
  PushEvent: 'PushEvent',
  WatchEvent: 'WatchEvent'
};

const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const EventTypeReporters = {
  [EventTypes.PushEvent]: (log, event) => {
    const branch = removeRefsHeads(event.payload.ref);
    log(`${describeTime(event.created_at)}: ${describeActor(event.actor)}`, 'pushed to branch', branch, 'in', describeRepo(event.repo));
  }
};

const defaultReporter = (log, event) => {
  log('DefaultReporter: ', event.type);
};


const reportOnEvent = (log, event) => {
  const reporter = EventTypeReporters[event.type] || defaultReporter;
  reporter(log, event);
};

const reportOnEvents = (log, eventList) => {
  for (let i = 0; i < eventList.length; i++) {
    reportOnEvent(log, eventList[i]);
  }
};

module.exports = reportOnEvents;
