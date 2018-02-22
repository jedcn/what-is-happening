
const fs = require('fs');

const Mustache = require('mustache');

const format = require('date-fns').format;

const dateFormat = 'ddd MMMM Do';

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

const EventTypeDescribers = {
  [EventTypes.PushEvent]: (event) => {
    const branch = removeRefsHeads(event.payload.ref);
    return `${describeTime(event.created_at)}: ${describeActor(event.actor)} pushed to branch ${branch} in ${describeRepo(event.repo)}`;
  }
};

const defaultDescription = (event) => `Default: ${event.type}`;

const describeEvent = (event) => {
  const describer = EventTypeDescribers[event.type] || defaultDescription;
  return { description: describer(event) }
};

const reportOnEvents = (username, eventList) => {
  const template = `${__dirname}/templates/userActivity.mustache`;
  const title = username;
  const describedEvents = eventList.map(describeEvent);
  const data = {
    describedEvents,
    title
  };
  fs.readFile(template, function (err, content) {
    if (err) throw err;
    const output = Mustache.render(content.toString(), data);
    console.log(output);
  });
};

module.exports = reportOnEvents;
