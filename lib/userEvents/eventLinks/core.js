/**
 * Simple functions for building out links
 */
const link = (href, text) => `<a href='${href}' target='_blank'>${text}</a>`;

const hrefForRepo = (server, repo) => `https://${server}/${repo}`;

const hrefForBranch = (server, repo, branch) => `${hrefForRepo(server, repo)}/tree/${branch}`;

module.exports.link = link;
module.exports.hrefForRepo = hrefForRepo;
module.exports.hrefForBranch = hrefForBranch;
