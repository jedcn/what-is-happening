const IssueCommentEventAnalyzer = (event) => {
  const { payload } = event;
  const { pull_request } = payload;
  let actionDescription = `Action: ${payload.action}`;
  if (payload.action === 'created') {
    actionDescription = 'commented on the issue';
  } else if (payload.action === 'edited') {
    actionDescription = 'updated a comment on the issue';
  } else if (payload.action === 'deleted') {
    actionDescription = 'deleted a comment on the issue';
  }
  const title = payload.issue.title;
  return {
    actionDescription,
    title
  };
};

module.exports = IssueCommentEventAnalyzer;
