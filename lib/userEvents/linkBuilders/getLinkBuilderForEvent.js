
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

const getLinkBuilderForEvent = (event) => eventLinkBuilders[event.type] || [];

module.exports = getLinkBuilderForEvent;
