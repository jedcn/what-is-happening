const BaseEvent = require('./BaseEvent');

const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const { hrefForRepo } = require('../core/linkUtils');

class PushEvent extends BaseEvent {

  constructor(map, options) {
    super(map);
    this.options = options;
  }

  getCommitCount() {
    return this.map.getIn(['payload', 'size']);
  }

  getCommitCountDescription() {
    const commitCount = this.getCommitCount();
    return `${commitCount} commit${commitCount === 1 ? '' : 's'}`;
  }

  getCommitsHref() {
    const { server } = this.options;
    const repo = this.getRepo();
    const before = this.map.getIn(['payload', 'before']);
    const head = this.map.getIn(['payload', 'head']);
    return `${hrefForRepo(server, repo)}/compare/${before}...${head}`;
  }

  getBranch() {
    const ref = this.map.getIn(['payload', 'ref']);
    return removeRefsHeads(ref);
  }

  additionalJSON() {
    return {
      branch: this.getBranch(),
      commitCountDescription: this.getCommitCountDescription(),
      commitsHref: this.getCommitsHref()
    }
  }
}

module.exports = PushEvent;
