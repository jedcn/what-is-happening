
const describeTime = require('../../describeTime');
const renderUserEventText = require('../renderHelpers').renderUserEventText;

const EventTypes = require('../EventTypes');

const CreateEventAnalyzer = require('./CreateEventAnalyzer');
const DeleteEventAnalyzer = require('./DeleteEventAnalyzer');
const IssueCommentEventAnalyzer = require('./IssueCommentEventAnalyzer');
const PullRequestEventAnalyzer = require('./PullRequestEventAnalyzer');
const PullRequestReviewCommentEventAnalyzer = require('./PullRequestReviewCommentEventAnalyzer');
const PushEventAnalyzer = require('./PushEventAnalyzer');

const eventAnalyzers = {
  [EventTypes.DeleteEvent]: DeleteEventAnalyzer,
  [EventTypes.IssueCommentEvent]: IssueCommentEventAnalyzer,
  [EventTypes.PullRequestEvent]: PullRequestEventAnalyzer,
  [EventTypes.PullRequestReviewCommentEvent]: PullRequestReviewCommentEventAnalyzer,
  [EventTypes.PushEvent]: PushEventAnalyzer,
  [EventTypes.CreateEvent]: CreateEventAnalyzer
};

const getDataForEvent = (event, server) => {
  const defaultData = {};
  const eventAnalyzer = eventAnalyzers[event.type];
  if (eventAnalyzer) {
    try {
      return eventAnalyzer(event, server);
    } catch (analyzeErr) {
      console.error("Failed to analyze an event:", analyzeErr);
    }
  }
  return defaultData;
};

module.exports = getDataForEvent;
