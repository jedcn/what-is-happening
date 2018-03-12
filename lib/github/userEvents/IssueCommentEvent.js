const BaseEvent = require('./BaseEvent');

class IssueCommentEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getActionDescription() {
    const action = this.map.getIn(['payload', 'action']);
    if (action === 'created') {
      return 'commented on the issue';
    } else if (action === 'edited') {
      return 'updated a comment on the issue';
    } else if (action === 'deleted') {
      return 'deleted a comment on the issue';
    }
  }

  getCommentUrl() {
    return this.map.getIn(['payload', 'comment', 'html_url']);
  }

  getIssueUrl() {
    return this.map.getIn(['payload', 'issue', 'html_url']);
  }

  getTitle() {
    return this.map.getIn(['payload', 'issue', 'title']);
  }

  additionalJSON() {
    return {
      actionDescription: this.getActionDescription(),
      title: this.getTitle()
    }
  }
}

module.exports = IssueCommentEvent;
