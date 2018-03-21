const minimist = require('minimist');
const { subDays } = require('date-fns');
const loadRunControlFile = require('./loadRunControlFile');
const loadUserSuppliedConfig = require('./loadSuppliedConfig');
const initOctokit = require('../github/client/initOctokit');

class Config {

  constructor(processArgv) {
    this.minimistArgv = minimist(processArgv.slice(2));
    this.runControlValues = loadRunControlFile();
    this.userSuppliedConfig = {};
    if (this.minimistArgv.config) {
      this.userSuppliedConfig = loadUserSuppliedConfig(this.minimistArgv.config);
    }
  }

  getBeginning() {
    const defaultDaysBack = 7;
    const daysBack = this.userSuppliedConfig.daysBack || defaultDaysBack;
    return subDays(new Date(), daysBack);
  }

  getEventsFilter() {
    const includeAllEvents = (event) => true;
    return this.userSuppliedConfig.eventsFilter || includeAllEvents;
  }

  getOutputFile() {
    const users = this.getUsers();
    const defaultOutputFile = `${users.join('-')}.html`;
    return this.userSuppliedConfig.outputFile || defaultOutputFile;
  }

  getUsers() {
    if (this.userSuppliedConfig.users) {
      return this.userSuppliedConfig.users;
    }
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


  getClient() {
    const host = this.getHost();
    if (this.isUsingGithubEnterprise()) {
      const pathPrefix = this.getPathPrefix();
      const accessToken = this.getAccessToken();
      return initOctokit({ host, pathPrefix,  accessToken });
    }
    return initOctokit({ host });
  }

  getTitle() {
    const users = this.getUsers();
    const defaultTitle = `${users.join(', ')} Activity`;
    return this.userSuppliedConfig.title || defaultTitle;
  }
}


const buildConfigFromArgs = (processArgv) => {
  return new Config(processArgv);
};

module.exports = buildConfigFromArgs;
