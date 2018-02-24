const { link } = require('./core');

const linkToViewIssueCommentEventIssue= (issueCommentEvent) => {
  const hrefToPullRequest = issueCommentEvent.payload.issue.html_url;
  const linkText = 'the issue';
  return link(hrefToPullRequest, linkText);
};

module.exports = linkToViewIssueCommentEventIssue;
