
const describeTime = require('../../describeTime');
const renderUserEventText = require('../renderHelpers').renderUserEventText;

const EventTypes = require('../EventTypes');

const CreateEventAnalyzer = require('./CreateEventAnalyzer');
const DeleteEventAnalyzer = require('./DeleteEventAnalyzer');
const IssueCommentEventAnalyzer = require('./IssueCommentEventAnalyzer');
const PullRequestEventAnalyzer = require('./PullRequestEventAnalyzer');
const PushEventAnalyzer = require('./PushEventAnalyzer');

const eventAnalyzers = {
  [EventTypes.DeleteEvent]: DeleteEventAnalyzer,
  [EventTypes.IssueCommentEvent]: IssueCommentEventAnalyzer,
  [EventTypes.PullRequestEvent]: PullRequestEventAnalyzer,
  [EventTypes.PushEvent]: PushEventAnalyzer,
  [EventTypes.CreateEvent]: CreateEventAnalyzer
};

const defaultAnalysis = (event) => {
  return {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: renderUserEventText(event.type, {}, event)
  }
};

const getDataForEvent = (event, server) => {
  const eventAnalyzer = eventAnalyzers[event.type] || defaultAnalysis;
  return eventAnalyzer(event, server);
};

module.exports = getDataForEvent;
