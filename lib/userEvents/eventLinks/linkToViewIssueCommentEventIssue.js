const linkToViewIssueCommentEventIssue = (issueCommentEvent) => {
  return {
    href: issueCommentEvent.payload.issue.html_url,
    text: 'the issue'
  };
};

module.exports = linkToViewIssueCommentEventIssue;
