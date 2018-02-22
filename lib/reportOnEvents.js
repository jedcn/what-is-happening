
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
  [EventTypes.PushEvent]: (event, server) => {
    const template = `${__dirname}/templates/userActivity/PushEvent.mustache`;
    const data = {
      actor: event.actor,
      branch: removeRefsHeads(event.payload.ref),
      created_at: describeTime(event.created_at),
      payload: event.payload,
      repo: event.repo,
      server
    };
    const content = fs.readFileSync(template);
    return Mustache.render(content.toString(), data);
  }
};

const defaultDescription = (event, server) => `Default: ${event.type}`;

const describeEvent = (event, server) => {
  const describer = EventTypeDescribers[event.type] || defaultDescription;
  return { description: describer(event, server) }
};

const reportOnEvents = (username, server, eventList) => {
  const template = `${__dirname}/templates/userActivity/index.mustache`;
  const title = username;
  const describedEvents = eventList.map((event) => describeEvent(event, server));
  const data = {
    describedEvents,
    title
  };
  const content = fs.readFileSync(template);
  console.log(Mustache.render(content.toString(), data));
};

module.exports = reportOnEvents;
