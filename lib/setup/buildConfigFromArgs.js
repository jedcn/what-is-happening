const minimist = require('minimist');
const { subDays } = require('date-fns');
const loadRunControlFile = require('./loadRunControlFile');
const initOctokit = require('../github/client/initOctokit');

class Config {

  constructor(processArgv) {
    this.processArgv = processArgv;
    this.minimistArgv = minimist(process.argv.slice(2));
    this.runControlValues = loadRunControlFile();
  }

  getBeginning() {
    return subDays(new Date(), 7);
  }

  getUsers() {
    const user = this.minimistArgv.user;
    return user.split(',');
  }

  getHost() {
    const githubEnterpriseUrl = this.runControlValues['GITHUB_ENTERPRISE_URL'];
    return githubEnterpriseUrl || 'api.github.com';
  }

  getPathPrefix() {
    return this.minimistArgv['path-prefix'] || 'api/v3';
  }

  getAccessToken() {
    return this.runControlValues['ACCESS_TOKEN'];
  }

  isUsingGithubEnterprise() {
    return this.getHost() !== 'api.github.com';
  }

  getFocusOnRepos() {
    return this.minimistArgv['focus-on-repos'] ? this.minimistArgv['focus-on-repos'].split(',') : [];
  }

  getClient() {
    const host = this.getHost();
    if (this.isUsingGithubEnterprise()) {
      const pathPrefix = this.getPathPrefix();
      const accessToken = this.getAccessToken();
      return initOctokit({ host, pathPrefix,  accessToken });
    }
    return initOctokit({ host });
  }
}


const buildConfigFromArgs = (processArgv) => {
  return new Config(processArgv);
};

module.exports = buildConfigFromArgs;
