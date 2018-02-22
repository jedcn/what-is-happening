
const fs = require('fs');

const Mustache = require('mustache');

const format = require('date-fns').format;

const dateFormat = 'ddd MMMM Do';

const describeTime = (timeString) => {
  const date = new Date(timeString);
  return format(date, dateFormat)
};

const EventTypes = {
  CreateEvent: 'CreateEvent',
  DeleteEvent: 'DeleteEvent',
  PullRequestEvent: 'PullRequestEvent',
  PullRequestReviewCommentEvent: 'PullRequestReviewCommentEvent',
  PushEvent: 'PushEvent',
  WatchEvent: 'WatchEvent'
};

const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const link = (href, text) => `<a href="${href}">${text}</a>`;

const hrefForRepo = (server, repo) => `https://${server}/${repo}`;

const hrefForBranch = (server, repo, branch) => `${hrefForRepo(server, repo)}/tree/${branch}`;

// See also: https://developer.github.com/v3/activity/events/types/
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
  },
  [EventTypes.CreateEvent]: (event, server) => {
    const template = `${__dirname}/templates/userActivity/CreateEvent.mustache`;

    const payload = event.payload;
    let linkHref;
    let linkText;
    if (payload.ref_type === 'repository') {
      linkText = `a new repository named ${event.repo.name}`;
      linkHref = hrefForRepo(server, event.repo.name, event.repo.name);
    } else {
      linkText = `a new ${payload.ref_type} named ${payload.ref}`;
      linkHref = hrefForBranch(server, event.repo.name, payload.ref);
    }
    const linkToCreatedThing = link(linkHref, linkText);
    const data = {
      actor: event.actor,
      created_at: describeTime(event.created_at),
      event: JSON.stringify(event),
      linkToCreatedThing,
      repo: event.repo,
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
