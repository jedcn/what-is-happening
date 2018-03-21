const BaseEvent = require('./BaseEvent');

class PullRequestReviewCommentEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getAction() {
    return this.map.getIn(['payload', 'action']);
  }

  getActionDescription() {
    const action = this.getAction();
    if (action === 'created') {
      return 'Commented on the pull request';
    } else if (action === 'edited') {
      return 'Updated a comment on the pull request';
    } else if (action === 'deleted') {
      return 'Deleted a comment on the pull request';
    } else {
      return `PullRequestReviewCommentEvent Action: ${action}`;
    }
  }

  getBody() {
    return this.map.getIn(['payload', 'comment', 'body']);
  }

  getTitle() {
    return this.map.getIn(['payload', 'pull_request', 'title']);
  }

  getCommentUrl() {
    return this.map.getIn(['payload', 'comment', 'html_url']);
  }

  getPullRequestUrl() {
    return this.map.getIn(['payload', 'pull_request', 'html_url']);
  }

  additionalJSON() {
    return {
      actionDescription: this.getActionDescription(),
      commentUrl: this.getCommentUrl(),
      pullRequestUrl: this.getPullRequestUrl(),
      title: this.getTitle()
    }
  }
}

module.exports = PullRequestReviewCommentEvent;
