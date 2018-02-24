
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
  const links = linkBuilders.map((builder) => {
    try {
      return builder(event, server);
    } catch (buildErr) {
      console.error("Failed to build a link:", buildErr);
      return null;
    }
  });
  return links.filter((link) => link !== null);
};

module.exports = getLinksForEvent;
