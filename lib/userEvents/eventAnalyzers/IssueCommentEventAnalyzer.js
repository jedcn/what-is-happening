const IssueCommentEventAnalyzer = (event) => {
  const { payload } = event;
  const { pull_request } = payload;
  let actionDescription = `Action: ${payload.action}`;
  if (payload.action === 'created') {
    actionDescription = 'commented on an issue';
  } else if (payload.action === 'edited') {
    actionDescription = 'updated a comment on an issue';
  } else if (payload.action === 'deleted') {
    actionDescription = 'deleted a comment on an issue';
  }
  const title = payload.issue.title;
  const stringifiedPayload = JSON.stringify(payload);
  return {
    actionDescription,
    stringifiedPayload,
    title
  };
};

module.exports = IssueCommentEventAnalyzer;
