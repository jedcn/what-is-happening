const EventTypes = require('./EventTypes');

const EventTemplates = {
  [EventTypes.CommitCommentEvent]: 'Commented on a <a href="{{commentUrl}}" target="_blank">commit</a>',
  [EventTypes.CreateEvent]: 'Created a {{createdItemType}} named <a href="{{createdItemUrl}}" target="_blank">{{createdItemName}}</a>',
  [EventTypes.DeleteEvent]: 'Deleted a {{deletedItemType}} named <code>{{deletedItemName}}</code>',
  [EventTypes.IssueCommentEvent]: '{{actionDescription}} <a href="{{commentUrl}}" target="_blank">{{title}}</a>',
  [EventTypes.IssuesEvent]: '{{actionDescription}} <a href="{{issueUrl}}" target="_blank">{{title}}</a>',
  [EventTypes.PullRequestEvent]: '{{actionDescription}} <a href="{{pullRequestUrl}}" target="_blank">{{title}}</a>',
  [EventTypes.PullRequestReviewCommentEvent]: '{{actionDescription}} <a href="{{commentUrl}}" target="_blank">{{title}}</a>',
  [EventTypes.PushEvent]: 'Pushed <a href="{{commitsUrl}}" target="_blank">{{commitCountDescription}}</a> to <code>{{{branch}}}</code>'
};

module.exports = EventTemplates;
