const renderStringWithData = require('./renderHelpers').renderStringWithData;
const EventTemplates = require('./EventTemplates');
const EventTypes = require('./EventTypes');
const { link } = require('./linkUtils');

class HtmlWrapper {

  constructor(event) {
    this.event = event;
  }

  getDescription() {
    const defaultTemplate = '{{eventType}}';
    const eventType = this.event.getEventType();
    const eventTemplate = EventTemplates[eventType] || defaultTemplate;
    return renderStringWithData(eventTemplate, this.event.toJSON());
  }

  getLinks() {
    const eventType = this.event.getEventType();
    if (eventType === EventTypes.CommitCommentEvent) {
      return [
        link(this.event.getCommentUrl(), 'the comment'),
      ];
    } else if (eventType === EventTypes.CreateEvent) {
      return [
        link(this.event.getCreatedItemUrl(), `the ${this.event.getCreatedItemType()}`)
      ];
    } else if (eventType === EventTypes.IssueCommentEvent) {
      return [
        link(this.event.getCommentUrl(), 'the comment'),
        link(this.event.getIssueUrl(), 'the issue')
      ];
    } else if (eventType === EventTypes.IssuesEvent) {
      return [
        link(this.event.getIssueUrl(), 'the issue')
      ];
    } else if (eventType === EventTypes.PushEvent) {
      return [
        link(this.event.getCommitsUrl(), `the ${this.event.getCommitCountDescription()}`)
      ]
    } else if (eventType === EventTypes.PullRequestEvent) {
      return [
        link(this.event.getPullRequestUrl(), 'the pull request')
      ]
    } else if (eventType === EventTypes.PullRequestReviewCommentEvent) {
      return [
        link(this.event.getCommentUrl(), 'the comment'),
        link(this.event.getPullRequestUrl(), 'the pull request')
      ];
    }
    return [];
  }

  toJSON() {
    const eventJSON = this.event.toJSON();
    return Object.assign(eventJSON, {
      description: this.getDescription(),
      links: this.getLinks()
    })
  }
}

module.exports = HtmlWrapper;
