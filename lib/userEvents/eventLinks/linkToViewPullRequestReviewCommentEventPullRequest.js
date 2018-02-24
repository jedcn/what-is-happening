/**
 * View the pull request associated w/ a PullRequestEventReviewComment.
 */
const linkToViewPullRequestReviewCommentEventPullRequest = (pullRequestReviewCommentEvent) => {
  return {
    href: pullRequestReviewCommentEvent.payload.pull_request.html_url,
    text: 'the pull request'
  };
};

module.exports = linkToViewPullRequestReviewCommentEventPullRequest;
