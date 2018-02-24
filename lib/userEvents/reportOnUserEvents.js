
const describeTime = require('../describeTime');

const EventTypes = require('./EventTypes');

const renderUserEventText =  require('./renderHelpers').renderUserEventText;
const renderIndex = require('./renderHelpers').renderIndex;

const linkToViewCreateEventItem = require('./linkBuilders/linkToViewCreateEventItem');
const linkToViewPullRequestEventPullRequest = require('./linkBuilders/linkToViewPullRequestEventPullRequest');
const linkToViewPushEventCommits = require('./linkBuilders/linkToViewPushEventCommits');

const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const buildUserEvent = (data, event, server) => {
  const eventLinkBuilder = eventLinkBuilders[event.type] || [];

  const userEvent = {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: renderUserEventText(event.type, data, event)
  };
  userEvent.links = eventLinkBuilder.map((builder) => builder(event, server));
  return userEvent;
};

const eventDescriptionBuilders = {
  [EventTypes.DeleteEvent]: (event, server) => {
    const { payload } = event;
    const { ref, ref_type } = payload;
    const customData = { ref, ref_type };
    return buildUserEvent(customData, event, server);
  },
  [EventTypes.PullRequestEvent]: (event, server) => {
    const { payload } = event;
    const { pull_request } = payload;
    let actionDescription = `Action: ${payload.action}`;
    if (payload.action === 'opened') {
      actionDescription = 'opened a pull request';
    } else if (payload.action === 'closed') {
      if (pull_request.merged) {
        actionDescription = 'merged a pull request';
      } else {
        actionDescription = 'closed a pull request without merging it';
      }
    }
    const { commits, additions, deletions } = pull_request;
    const fromBranch = pull_request.head.ref;
    const intoBranch = pull_request.base.ref;
    const customData = {
      actionDescription,
      additions,
      commits,
      deletions,
      fromBranch,
      intoBranch
    };
    return buildUserEvent(customData, event, server);
  },
  [EventTypes.PushEvent]: (event, server) => {
    const customData = {
      branch: removeRefsHeads(event.payload.ref)
    };
    return buildUserEvent(customData, event, server);
  },
  [EventTypes.CreateEvent]: (event, server) => {
    const { payload } = event;
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

const eventLinkBuilders = {
  [EventTypes.PullRequestEvent]: [
    linkToViewPullRequestEventPullRequest,
  ],
  [EventTypes.PushEvent]: [
    linkToViewPushEventCommits
  ],
  [EventTypes.CreateEvent]: [
    linkToViewCreateEventItem
  ]
};

const defaultDescriptionBuilder = (event, server) => {
  return {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: renderUserEventText(event.type, {}, event)
  }
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
