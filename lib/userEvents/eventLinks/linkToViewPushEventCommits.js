const { hrefForRepo } = require('./core');

const hrefForCommitsFromPushEvent = (server, repo, pushEventPayload) => {
  const { before, head } = pushEventPayload;
  return `${hrefForRepo(server, repo)}/compare/${before}...${head}`;
};

/**
 * View the commits associated w/ a PushEvent.
 */
const linkToViewPushEventCommits = (pushEvent, server) => {
  const { payload } = pushEvent;
  return {
    href: hrefForCommitsFromPushEvent(server, pushEvent.repo.name, payload),
    text: `the ${payload.size} commit${payload.size === 1 ? '' : 's'}`
  }
};

module.exports = linkToViewPushEventCommits;
