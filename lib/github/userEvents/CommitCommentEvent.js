const BaseEvent = require('./BaseEvent');

class CommitCommentEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getCommentUrl() {
    return this.map.getIn(['payload', 'comment', 'html_url']);
  }

  additionalJSON() {
    return {
      commentUrl: this.getCommentUrl(),
    }
  }
}

module.exports = CommitCommentEvent;
