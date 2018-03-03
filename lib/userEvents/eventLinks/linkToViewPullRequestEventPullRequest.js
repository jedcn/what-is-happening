/**
 * View the pull request associated w/ a PullRequestEvent.
 */
const linkToViewPullRequestEventPullRequest = (pullRequestEvent) => {
  return {
    href: pullRequestEvent.payload.pull_request.html_url,
    text: 'the pull request'
  }
};

module.exports = linkToViewPullRequestEventPullRequest;
