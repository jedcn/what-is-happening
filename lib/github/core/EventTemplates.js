const EventTypes = require('./EventTypes');

const EventTemplates = {
  [EventTypes.CreateEvent]: 'Created a {{createdItemType}} named <code>{{createdItemName}}</code>',
  [EventTypes.DeleteEvent]: 'Deleted a {{deletedItemType}} named <code>{{deletedItemName}}</code>',
  [EventTypes.IssueCommentEvent]: '{{actionDescription}} <a href="{{commentUrl}}" target="_blank">{{title}}</a>',
  [EventTypes.IssuesEvent]: '{{actionDescription}} <a href="{{issueUrl}}" target="_blank">{{title}}</a>',
  [EventTypes.PullRequestEvent]: '{{actionDescription}} <a href="{{pullRequestHref}}" target="_blank">{{title}}</a>',
  [EventTypes.PullRequestReviewCommentEvent]: '{{actionDescription}} <a href="{{commentHref}}" target="_blank">{{title}}</a>',
  [EventTypes.PushEvent]: 'Pushed <a href="{{commitsHref}}" target="_blank">{{commitCountDescription}}</a> to <code>{{{branch}}}</code>'
};

module.exports = EventTemplates;
