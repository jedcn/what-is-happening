
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

const hrefForCommitsFromPushEvent = (server, repo, pushEventPayload) => {
  const { before, head } = pushEventPayload;
  return `${hrefForRepo(server, repo)}/compare/${before}...${head}`;
};

// See also: https://developer.github.com/v3/activity/events/types/
const EventTypeDescribers = {
  [EventTypes.PushEvent]: (event, server) => {
    const template = `${__dirname}/templates/userEvents/PushEvent.mustache`;
    const data = {
      actor: event.actor,
      branch: removeRefsHeads(event.payload.ref),
      created_at: describeTime(event.created_at),
      payload: event.payload,
      repo: event.repo,
      server,
    };
    const links = [];
    links.push(link(hrefForCommitsFromPushEvent(server, event.repo.name, event.payload), `the ${event.payload.size} commit(s)`));
    const content = fs.readFileSync(template);
    return {
      created_at: describeTime(event.created_at),
      links,
      repo: event.repo.name,
      text: Mustache.render(content.toString(), data),
    }
  },
  [EventTypes.CreateEvent]: (event, server) => {
    const template = `${__dirname}/templates/userEvents/CreateEvent.mustache`;

    const links = [];
    const payload = event.payload;
    let linkHref;
    let typeOfCreatedThing;
    let nameOfCreatedThing;
    if (payload.ref_type === 'repository') {
      typeOfCreatedThing = `a new repository`;
      nameOfCreatedThing = event.repo.name;
      links.push(link(hrefForRepo(server, event.repo.name, event.repo.name), 'the new repo'));
    } else {
      typeOfCreatedThing = `a new ${payload.ref_type}`;
      nameOfCreatedThing = payload.ref;
      links.push(link(hrefForBranch(server, event.repo.name, payload.ref), `the new ${payload.ref_type}`));
    }
    const data = {
      actor: event.actor,
      created_at: describeTime(event.created_at),
      event: JSON.stringify(event),
      typeOfCreatedThing,
      nameOfCreatedThing,
      repo: event.repo,
    };
    const content = fs.readFileSync(template);
    return {
      created_at: describeTime(event.created_at),
      links,
      repo: event.repo.name,
      text: Mustache.render(content.toString(), data)
    }
  }

};

const defaultDescription = (event, server) => {
  return {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: `Default: ${event.type}`
  }
};

const describeEvent = (event, server) => {
  const describer = EventTypeDescribers[event.type] || defaultDescription;
  return describer(event, server);
};

const reportOnUserEvents = (username, server, eventList) => {
  const template = `${__dirname}/templates/userEvents/index.mustache`;
  const title = username;
  const userEvents = eventList.map((event) => describeEvent(event, server));
  const data = {
    userEvents: userEvents,
    title
  };
  const content = fs.readFileSync(template);
  return Mustache.render(content.toString(), data);
};

module.exports = reportOnUserEvents;
