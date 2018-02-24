const { link } = require('./core');

const linkToViewPullRequestReviewCommentEventComment = (pullRequestReviewCommentEvent) => {
  const hrefToPullRequest = pullRequestReviewCommentEvent.payload.comment.html_url;
  const linkText = 'the comment';
  return link(hrefToPullRequest, linkText);
};

module.exports = linkToViewPullRequestReviewCommentEventComment;
