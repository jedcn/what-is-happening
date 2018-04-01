const BaseEvent = require('./BaseEvent');

class CommitCommentEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getBody() {
    return this.map.getIn(['payload', 'comment', 'body']);
  }

  getSHA() {
    return this.map.getIn(['payload', 'comment', 'commit_id']);
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
