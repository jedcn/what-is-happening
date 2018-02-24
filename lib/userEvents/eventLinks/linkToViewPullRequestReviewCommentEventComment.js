const linkToViewPullRequestReviewCommentEventComment = (pullRequestReviewCommentEvent) => {
  return {
    href: pullRequestReviewCommentEvent.payload.comment.html_url,
    text: 'the comment'
  };
};

module.exports = linkToViewPullRequestReviewCommentEventComment;
