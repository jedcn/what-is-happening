const initOctokit = ({ host, pathPrefix, accessToken }) => {
  const protocol = 'https';
  const octokit = require('@octokit/rest')({
    host,
    pathPrefix,
    protocol
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
