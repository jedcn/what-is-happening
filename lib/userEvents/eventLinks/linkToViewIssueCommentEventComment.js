const linkToViewIssueCommentEventComment = (issueCommentEvent) => {
  return {
    href: issueCommentEvent.payload.comment.html_url,
    text: 'the comment'
  };
};

module.exports = linkToViewIssueCommentEventComment;
