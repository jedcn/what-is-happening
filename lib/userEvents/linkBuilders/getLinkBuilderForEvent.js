
const EventTypes = require('../EventTypes');

const linkToViewCreateEventItem = require('./linkToViewCreateEventItem');
const linkToViewPullRequestEventPullRequest = require('./linkToViewPullRequestEventPullRequest');
const linkToViewPushEventCommits = require('./linkToViewPushEventCommits');

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

const getLinkBuilderForEvent = (event) => eventLinkBuilders[event.type] || [];

module.exports = getLinkBuilderForEvent;
