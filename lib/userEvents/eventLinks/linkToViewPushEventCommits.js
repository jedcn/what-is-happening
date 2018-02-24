const { link, hrefForRepo } = require('./core');

const hrefForCommitsFromPushEvent = (server, repo, pushEventPayload) => {
  const { before, head } = pushEventPayload;
  return `${hrefForRepo(server, repo)}/compare/${before}...${head}`;
};

const linkToViewPushEventCommits = (pushEvent, server) => {
  const hrefToViewCommits = hrefForCommitsFromPushEvent(server, pushEvent.repo.name, pushEvent.payload);
  const linkText = `the ${pushEvent.payload.size} commit(s)`;
  return link(hrefToViewCommits, linkText);
};

module.exports = linkToViewPushEventCommits;
