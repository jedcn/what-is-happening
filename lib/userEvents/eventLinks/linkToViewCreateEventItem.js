const { link, hrefForRepo, hrefForBranch } = require('./core');

const linkToViewCreateEventItem = (createEvent, server) => {
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

module.exports = linkToViewCreateEventItem;
