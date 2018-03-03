const PullRequestEventAnalyzer = (event) => {
  const { payload } = event;
  const { pull_request } = payload;
  let actionDescription = `Action: ${payload.action}`;
  if (payload.action === 'opened') {
    actionDescription = 'opened a pull request';
  } else if (payload.action === 'reopened') {
    actionDescription = 're-opened a pull request';
  } else if (payload.action === 'closed') {
    if (pull_request.merged) {
      actionDescription = 'merged a pull request';
    } else {
      actionDescription = 'closed a pull request without merging it';
    }
  }
  const { commits, additions, deletions } = pull_request;
  const fromBranch = pull_request.head.ref;
  const intoBranch = pull_request.base.ref;
  return {
    actionDescription,
    additions,
    commits,
    deletions,
    fromBranch,
    intoBranch
  };
};

module.exports = PullRequestEventAnalyzer;
