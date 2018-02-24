const linkToViewPullRequestReviewCommentEventComment = (pullRequestReviewCommentEvent) => {
  return {
    href: pullRequestReviewCommentEvent.payload.pull_request.html_url,
    text: 'the pull request'
  };
};

module.exports = linkToViewPullRequestReviewCommentEventComment;
