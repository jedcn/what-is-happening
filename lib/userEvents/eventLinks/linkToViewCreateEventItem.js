const { hrefForRepo, hrefForBranch } = require('./core');

/**
 * View the item (repo, branch, or tag) associated w/ a CreateEvent
 */
const linkToViewCreateEventItem = (createEvent, server) => {
  const payload = createEvent.payload;
  if (payload.ref_type === 'repository') {
    return {
      href: hrefForRepo(server, createEvent.repo.name, createEvent.repo.name),
      text: 'the new repo'
    };
  }
  return {
    href: hrefForBranch(server, createEvent.repo.name, payload.ref),
    text: `the new ${payload.ref_type}`
  };
};

module.exports = linkToViewCreateEventItem;
