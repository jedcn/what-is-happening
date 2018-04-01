const { link, hrefForRepo } = require('../core/linkUtils');
const describeDay = require('../core/describeDay');
const describeHourOfDay = require('../core/describeHourOfDay');
const EventTypes = require('../core/EventTypes');
const { renderTemplateWithData } = require('../core/renderHelpers');

class CommentRundown {

  constructor(events, config) {
    this.events = events;
    this.config = config;
  }

  filterEventsBy(eventTypes) {
    return this.events.filter((e) => eventTypes.includes(e.getEventType()));
  }

  buildRepoLink(event) {
    const { server } = this.config;
    return link(hrefForRepo(server, event.getRepo()), event.getRepo());
  }

  buildCommentLink(event) {
    return link(event.getCommentUrl(), event.getBody());
  }

  buildContextLink(event) {
    const eventType = event.getEventType();
    if (eventType === EventTypes.PullRequestReviewCommentEvent) {
      const pullRequestLink = link(event.getPullRequestUrl(), event.getTitle());
      return `Pull Request: ${pullRequestLink}`;
    }
    if (eventType === EventTypes.IssueCommentEvent) {
      const issueLink = link(event.getIssueUrl(), event.getTitle());
      return `Issue: ${issueLink}`;
    }
    if (eventType === EventTypes.CommitCommentEvent) {
      const commitCommentLink = link(event.getCommentUrl(), event.getSHA());
      return `Commit: ${commitCommentLink}`;
    }
    return '';
  }

  buildCommentsData(commentEvents) {
    return commentEvents.map((event) => {
      return {
        actor: event.getActor(),
        createdAtDay: describeDay(event.getCreatedAt()),
        createdAtHour: describeHourOfDay(event.getCreatedAt()),
        commentLink: this.buildCommentLink(event),
        context: this.buildContextLink(event),
        repoLink: this.buildRepoLink(event)
      }
    }).toJSON();
  }

  getContent() {
    const commentTypes = [EventTypes.PullRequestReviewCommentEvent, EventTypes.IssueCommentEvent, EventTypes.CommitCommentEvent];
    const commentEvents = this.filterEventsBy(commentTypes);
    const renderData = {
      comments: this.buildCommentsData(commentEvents)
    };
    return renderTemplateWithData('userEvents/commentRundown', renderData);
  }

  toJSON() {
    return {
      content: this.getContent()
    };
  }

}

module.exports = CommentRundown;
