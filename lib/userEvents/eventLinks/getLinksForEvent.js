const EventTypes = require('../EventTypes');

const link = require('./core').link;

const linkToViewCreateEventItem = require('./linkToViewCreateEventItem');
const linkToViewPullRequestEventPullRequest = require('./linkToViewPullRequestEventPullRequest');
const linkToViewPushEventCommits = require('./linkToViewPushEventCommits');
const linkToViewIssueCommentEventIssue = require('./linkToViewIssueCommentEventIssue');
const linkToViewIssueCommentEventComment = require('./linkToViewIssueCommentEventComment');
const linkToViewPullRequestReviewCommentEventComment = require('./linkToViewPullRequestReviewCommentEventComment');
const linkToViewPullRequestReviewCommentEventPullRequest = require('./linkToViewPullRequestReviewCommentEventPullRequest');

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
  [EventTypes.PullRequestReviewCommentEvent]: [
    linkToViewPullRequestReviewCommentEventComment,
    linkToViewPullRequestReviewCommentEventPullRequest
  ],
  [EventTypes.PushEvent]: [
    linkToViewPushEventCommits
  ],
};

const getLinksForEvent = (event, server) => {
  const linkBuilders = eventLinkBuilders[event.type] || [];
  const links = linkBuilders.map((builder) => {
    try {
      const result = builder(event, server);
      return link(result.href, result.text);
    } catch (buildErr) {
      /* eslint-disable no-console */
      console.error("Failed to build a link:", buildErr);
      /* eslint-enable no-console */
      return null;
    }
  });
  return links.filter((link) => link !== null);
};

module.exports = getLinksForEvent;
