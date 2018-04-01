const BaseEvent = require('./BaseEvent');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class IssuesEvent extends BaseEvent {

  constructor(map) {
    super(map);
  }

  getAction() {
    return this.map.getIn(['payload', 'action']);
  }

  getTitle() {
    return this.map.getIn(['payload', 'issue', 'title']);
  }

  getActionDescription() {
    const action = this.getAction();
    return `${capitalizeFirstLetter(action)} an issue`;
  }

  getIssueUrl() {
    return this.map.getIn(['payload', 'issue', 'html_url']);
  }

  additionalJSON() {
    return {
      actionDescription: this.getActionDescription(),
      issueUrl: this.getIssueUrl(),
      title: this.getTitle()
    }
  }
}

module.exports = IssuesEvent;
