
const initOctokit = ({ host, pathPrefix, accessToken }) => {
  const octokit = require('@octokit/rest')({
    host,
    pathPrefix
  });
  if (accessToken) {
    octokit.authenticate({
      type: 'token',
      token: accessToken
    });
  }
  return octokit;
};

module.exports = initOctokit;
