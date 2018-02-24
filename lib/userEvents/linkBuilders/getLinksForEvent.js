
const EventTypes = require('../EventTypes');

const linkToViewCreateEventItem = require('./linkToViewCreateEventItem');
const linkToViewPullRequestEventPullRequest = require('./linkToViewPullRequestEventPullRequest');
const linkToViewPushEventCommits = require('./linkToViewPushEventCommits');
const linkToViewIssueCommentEventIssue = require('./linkToViewIssueCommentEventIssue');
const linkToViewIssueCommentEventComment = require('./linkToViewIssueCommentEventComment');

const eventLinkBuilders = {
  [EventTypes.CreateEvent]: [
    linkToViewCreateEventItem
  ],
  [EventTypes.IssueCommentEvent]: [
    linkToViewIssueCommentEventComment,
    linkToViewIssueCommentEventIssue
  ],
  [EventTypes.PullRequestEvent]: [
    linkToViewPullRequestEventPullRequest,
  ],
  [EventTypes.PushEvent]: [
    linkToViewPushEventCommits
  ],
};

const getLinksForEvent = (event, server) => {
  const linkBuilders = eventLinkBuilders[event.type] || [];
  return linkBuilders.map((builder) => builder(event, server));
};

module.exports = getLinksForEvent;
