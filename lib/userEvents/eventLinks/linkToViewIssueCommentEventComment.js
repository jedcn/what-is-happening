const { link } = require('./core');

const linkToViewIssueCommentEventComment= (issueCommentEvent) => {
  const hrefToPullRequest = issueCommentEvent.payload.comment.html_url;
  const linkText = 'the comment';
  return link(hrefToPullRequest, linkText);
};

module.exports = linkToViewIssueCommentEventComment;