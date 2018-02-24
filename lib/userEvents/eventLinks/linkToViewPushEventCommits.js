const { hrefForRepo } = require('./core');

const hrefForCommitsFromPushEvent = (server, repo, pushEventPayload) => {
  const { before, head } = pushEventPayload;
  return `${hrefForRepo(server, repo)}/compare/${before}...${head}`;
};

/**
 * View the commits associated w/ a PushEvent.
 */
const linkToViewPushEventCommits = (pushEvent, server) => {
  return {
    href: hrefForCommitsFromPushEvent(server, pushEvent.repo.name, pushEvent.payload),
    text: `the ${pushEvent.payload.size} commit(s)`
  }
};

module.exports = linkToViewPushEventCommits;
