const EventTypes = require('./EventTypes');

const EventTemplates = {
  [EventTypes.CreateEvent]: 'created a {{createdItemType}} named <code>{{createdItemName}}</code>',
  [EventTypes.DeleteEvent]: 'deleted a {{deletedItemType}} named <code>{{deletedItemName}}</code>',
  [EventTypes.IssueCommentEvent]: '{{actionDescription}}: "{{title}}"',
  [EventTypes.PullRequestEvent]: '{{actionDescription}}: <code>{{intoBranch}}</code> <- <code>{{fromBranch}}</code>. {{commits}} commits, {{additions}} additions, {{deletions}} deletions',
  [EventTypes.PullRequestReviewCommentEvent]: '{{actionDescription}}: "{{title}}"',
  [EventTypes.PushEvent]: 'pushed {{commitCountDescription}} to <code>{{{branch}}}</code>'
};

module.exports = EventTemplates;
