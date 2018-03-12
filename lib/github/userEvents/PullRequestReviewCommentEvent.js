const BaseEvent = require('./BaseEvent');

class PullRequestReviewCommentEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getActionDescription() {
    const action = this.map.getIn(['payload', 'action']);
    if (action === 'created') {
      return 'commented on the PR';
    } else if (action === 'edited') {
      return 'updated a comment on the PR';
    } else if (action === 'deleted') {
      return 'deleted a comment on the PR';
    } else {
      return `PullRequestReviewCommentEvent Action: ${action}`;
    }
  }

  getTitle() {
    return this.map.getIn(['payload', 'pull_request', 'title']);
  }

  getCommentHref() {
    return this.map.getIn(['payload', 'comment', 'html_url']);
  }

  getPullRequestHref() {
    return this.map.getIn(['payload', 'pull_request', 'html_url']);
  }

  additionalJSON() {
    return {
      actionDescription: this.getActionDescription(),
      commentHref: this.getCommentHref(),
      pullRequestHref: this.getPullRequestHref(),
      title: this.getTitle()
    }
  }
}

module.exports = PullRequestReviewCommentEvent;
