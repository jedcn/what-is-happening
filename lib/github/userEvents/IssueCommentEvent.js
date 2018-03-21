const BaseEvent = require('./BaseEvent');

class IssueCommentEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getAction() {
    return this.map.getIn(['payload', 'action']);
  }

  getActionDescription() {
    const action = this.getAction();
    if (action === 'created') {
      return 'Commented on the issue';
    } else if (action === 'edited') {
      return 'Updated a comment on the issue';
    } else if (action === 'deleted') {
      return 'Deleted a comment on the issue';
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
      commentUrl: this.getCommentUrl(),
      title: this.getTitle()
    }
  }
}

module.exports = IssueCommentEvent;
