const BaseEvent = require('./BaseEvent');

class PullRequestEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getAction() {
    return this.map.getIn(['payload', 'action']);
  }

  getActionDescription() {
    const action = this.getAction();
    if (action === 'opened') {
      return 'Opened a pull request';
    } else if (action === 'reopened') {
      return 'Re-opened a pull request';
    } else if (action === 'closed') {
      const merged = this.map.getIn(['payload', 'pull_request', 'merged']);
      if (merged) {
        return 'Merged a pull request';
      } else {
        return 'Closed a pull request without merging it';
      }
    } else {
      return `PullRequestEvent Action: ${action}`;
    }
  }

  getTitle() {
    return this.map.getIn(['payload', 'pull_request', 'title']);
  }

  getFromBranch() {
    return this.map.getIn(['payload', 'pull_request', 'head', 'ref']);
  }

  getIntoBranch() {
    return this.map.getIn(['payload', 'pull_request', 'base', 'ref']);
  }

  getCommits() {
    return this.map.getIn(['payload', 'pull_request', 'commits']);
  }

  getAdditions() {
    return this.map.getIn(['payload', 'pull_request', 'additions']);
  }

  getDeletions() {
    return this.map.getIn(['payload', 'pull_request', 'deletions']);
  }

  getPullRequestUrl() {
    return this.map.getIn(['payload', 'pull_request', 'html_url']);
  }

  additionalJSON() {
    return {
      actionDescription: this.getActionDescription(),
      fromBranch: this.getFromBranch(),
      intoBranch: this.getIntoBranch(),
      commits: this.getCommits(),
      additions: this.getAdditions(),
      deletions: this.getDeletions(),
      pullRequestUrl: this.getPullRequestUrl(),
      title: this.getTitle()
    }
  }
}

module.exports = PullRequestEvent;
