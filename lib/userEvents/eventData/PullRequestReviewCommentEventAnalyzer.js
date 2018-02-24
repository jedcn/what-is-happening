const PullRequestReviewCommentEventAnalyzer = (event) => {
  const { payload } = event;
  let actionDescription = `Action: ${payload.action}`;
  if (payload.action === 'created') {
    actionDescription = 'commented on the PR';
  } else if (payload.action === 'edited') {
    actionDescription = 'updated a comment on the PR';
  } else if (payload.action === 'deleted') {
    actionDescription = 'deleted a comment on the PR';
  }
  const title = payload.pull_request.title;
  return {
    actionDescription,
    title
  };
};

module.exports = PullRequestReviewCommentEventAnalyzer;
