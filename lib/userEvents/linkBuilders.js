
const link = (href, text) => `<a href='${href}' target='_blank'>${text}</a>`;

const hrefForRepo = (server, repo) => `https://${server}/${repo}`;

const hrefForBranch = (server, repo, branch) => `${hrefForRepo(server, repo)}/tree/${branch}`;

const hrefForCommitsFromPushEvent = (server, repo, pushEventPayload) => {
  const { before, head } = pushEventPayload;
  return `${hrefForRepo(server, repo)}/compare/${before}...${head}`;
};

const buildLinkToViewPushEventCommits = (pushEvent, server) => {
  const hrefToViewCommits = hrefForCommitsFromPushEvent(server, pushEvent.repo.name, pushEvent.payload);
  const linkText = `the ${pushEvent.payload.size} commit(s)`;
  return link(hrefToViewCommits, linkText);
};

module.exports.buildLinkToViewPushEventCommits = buildLinkToViewPushEventCommits;

const buildLinkToViewCreatedItem = (createEvent, server) => {
  let hrefToViewCreatedThing;
  let linkText;
  const payload = createEvent.payload;
  if (payload.ref_type === 'repository') {
    hrefToViewCreatedThing = hrefForRepo(server, createEvent.repo.name, createEvent.repo.name);
    linkText = 'the new repo';
  } else {
    hrefToViewCreatedThing = hrefForBranch(server, createEvent.repo.name, payload.ref);
    linkText = `the new ${payload.ref_type}`;
  }
  return link(hrefToViewCreatedThing, linkText)
};

module.exports.buildLinkToViewCreatedItem = buildLinkToViewCreatedItem;
