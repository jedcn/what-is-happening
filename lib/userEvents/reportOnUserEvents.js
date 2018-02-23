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

const buildUserEvent = (data, event, server) => {
  const eventLinkBuilder = eventLinks[event.type] || defaultLinkBuilder;

  const userEvent = {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: renderUserEvent(event.type, data, event)
  };
  if (eventLinkBuilder) {
    userEvent.links = eventLinkBuilder(event, server);
  }
  return userEvent;
};

// See also: https://developer.github.com/v3/activity/events/types/
const eventDescriptionBuilders = {
  [EventTypes.PushEvent]: (event, server) => {
    const customData = {
      branch: removeRefsHeads(event.payload.ref)
    };
    return buildUserEvent(customData, event, server);
  },
  [EventTypes.CreateEvent]: (event, server) => {
    const payload = event.payload;
    let typeOfCreatedThing;
    let nameOfCreatedThing;
    if (payload.ref_type === 'repository') {
      typeOfCreatedThing = `a new repository`;
      nameOfCreatedThing = event.repo.name;
    } else {
      typeOfCreatedThing = `a new ${payload.ref_type}`;
      nameOfCreatedThing = payload.ref;
    }
    const customData = {
      typeOfCreatedThing,
      nameOfCreatedThing,
    };
    return buildUserEvent(customData, event, server);
  }
};

const eventLinks = {
  [EventTypes.PushEvent]: (event, server) => {
    const hrefToViewCommits = hrefForCommitsFromPushEvent(server, event.repo.name, event.payload);
    const linkText = `the ${event.payload.size} commit(s)`;
    return [ link(hrefToViewCommits, linkText) ];
  },
  [EventTypes.CreateEvent]: (event, server) => {
    let hrefToViewCreatedThing;
    let linkText;
    const payload = event.payload;
    if (payload.ref_type === 'repository') {
      hrefToViewCreatedThing = hrefForRepo(server, event.repo.name, event.repo.name);
      linkText = 'the new repo';
    } else {
      hrefToViewCreatedThing = hrefForBranch(server, event.repo.name, payload.ref);
      linkText = `the new ${payload.ref_type}`;
    }
    return [ link(hrefToViewCreatedThing, linkText) ];
  }
};

const defaultDescriptionBuilder = (event, server) => {
  return {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: `Default: ${event.type}`
  }
};

const defaultLinkBuilder = (event, server) => {
  return [];
};

const describeEvent = (event, server) => {
  const eventDescriptionBuilder = eventDescriptionBuilders[event.type] || defaultDescriptionBuilder;
  return eventDescriptionBuilder(event, server);
};

const reportOnUserEvents = (username, server, eventList) => {
  const title = username;
  const userEvents = eventList.map((event) => describeEvent(event, server));
  return renderIndex(title, userEvents);
};

module.exports = reportOnUserEvents;
