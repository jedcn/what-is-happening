const { link } = require('./core');

const linkToViewPullRequestReviewCommentEventComment = (pullRequestReviewCommentEvent) => {
  const hrefToPullRequest = pullRequestReviewCommentEvent.payload.pull_request.html_url;
  const linkText = 'the pull request';
  return link(hrefToPullRequest, linkText);
};

module.exports = linkToViewPullRequestReviewCommentEventComment;
