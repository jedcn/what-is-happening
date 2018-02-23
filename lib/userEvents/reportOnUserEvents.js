const describeTime = require('../describeTime');

const renderUserEvent =  require('./renderHelpers').renderUserEvent;
const renderIndex = require('./renderHelpers').renderIndex;

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

const buildUserEvent = (event, data, links) => {
  return {
    created_at: describeTime(event.created_at),
    links,
    repo: event.repo.name,
    text: renderUserEvent(event.type, data, event)
  }
};

// See also: https://developer.github.com/v3/activity/events/types/
const EventTypeDescribers = {
  [EventTypes.PushEvent]: (event, server) => {
    const customData = {
      branch: removeRefsHeads(event.payload.ref)
    };
    const links = [];
    links.push(link(hrefForCommitsFromPushEvent(server, event.repo.name, event.payload), `the ${event.payload.size} commit(s)`));
    return buildUserEvent(event, customData, links);
  },
  [EventTypes.CreateEvent]: (event, server) => {
    const links = [];
    const payload = event.payload;
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
    const customData = {
      typeOfCreatedThing,
      nameOfCreatedThing,
    };
    return buildUserEvent(event, customData, links);
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
  const title = username;
  const userEvents = eventList.map((event) => describeEvent(event, server));
  return renderIndex(title, userEvents);
};

module.exports = reportOnUserEvents;
