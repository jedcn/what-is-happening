
const { link } = require('./core');

const linkToViewPullRequestEventPullRequest = (pullRequestEvent) => {
  const hrefToPullRequest = pullRequestEvent.payload.pull_request.html_url;
  const linkText = 'the pull request';
  return link(hrefToPullRequest, linkText);
};

module.exports = linkToViewPullRequestEventPullRequest;
