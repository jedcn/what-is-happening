const EventTypes = require('../core/EventTypes');
const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;

class ActivitySummary {

  constructor(events, config) {
    this.events = events;
    this.config = config;
  }

  filterEventsBy(eventTypes) {
    return this.events.filter((e) => eventTypes.includes(e.getEventType()));
  }

  buildCommentEventStats(commentEvents) {
    const startingStats = {
      issueComment: 0,
      pullRequestComment: 0
    };
    return commentEvents.reduce((acc, event) => {
      const eventType = event.getEventType();
      if (eventType === EventTypes.IssueCommentEvent) {
        acc.issueComment = acc.issueComment + 1;
      } else if (eventType === EventTypes.PullRequestReviewCommentEvent) {
        acc.pullRequestComment = acc.pullRequestComment + 1;
      }
      return acc;
    }, startingStats);
  }

  buildCommentHeadlines(commentStats) {
    return [
      {
        description: `${commentStats.issueComment} Comments on Issues`
      },
      {
        description: `${commentStats.pullRequestComment} Comments on Pull Requests`
      }
    ]
  }

  buildPullRequestStats(pullRequestEvents) {
    const startingStats = {
      closeWithMerge: 0,
      closeWithNoMerge: 0,
      open: 0,
      totalCommits: 0,
      totalLinesAdded: 0,
      totalLinesRemoved: 0
    };
    return pullRequestEvents.reduce((acc, event) => {
      const eventAction = event.getAction();
      if (eventAction === 'opened') {
        acc.open = acc.open + 1;
      } else if (eventAction === 'closed') {
        const merged = event.getMerged();
        if (merged) {
          acc.closeWithMerge = acc.closeWithMerge + 1;
          acc.totalLinesAdded = acc.totalLinesAdded + event.getAdditions();
          acc.totalLinesRemoved = acc.totalLinesRemoved + event.getDeletions();
          acc.totalCommits = acc.totalCommits + event.getCommits();
        } else {
          acc.closeWithNoMerge = acc.closeWithNoMerge + 1;
        }
      }
      return acc;
    }, startingStats);
  }

  buildPullRequestHeadlines(pullRequestStats) {
    return [
      {
        description: `${pullRequestStats.open} Pull Requests Opened`
      },
      {
        description: `${pullRequestStats.closeWithMerge} Pull Requests Merged`
      },
      {
        description: `${pullRequestStats.totalLinesAdded} Total Lines Added in Merged Pull Requests`
      },
      {
        description: `${pullRequestStats.totalLinesRemoved} Total Lines Removed in Merged Pull Requests`
      },
      {
        description: `${pullRequestStats.totalCommits} Total Commits in Merged Pull Requests`
      },
      {
        description: `${pullRequestStats.closeWithNoMerge} Pull Requests Closed (without being merged)`
      },
    ];
  }

  getContent() {
    const commentEvents = this.filterEventsBy([EventTypes.IssueCommentEvent, EventTypes.PullRequestReviewCommentEvent]);
    const commentEventStats = this.buildCommentEventStats(commentEvents);
    const commentHeadlines = this.buildCommentHeadlines(commentEventStats);

    const pullRequestEvents = this.filterEventsBy([EventTypes.PullRequestEvent]);
    const pullRequestStats = this.buildPullRequestStats(pullRequestEvents);
    const pullRequestHeadlines = this.buildPullRequestHeadlines(pullRequestStats);

    const renderData = {
      headlines: pullRequestHeadlines.concat(commentHeadlines)
    };
    return renderTemplateWithData('userEvents/activitySummary', renderData);
  }

  toJSON() {
    return {
      content: this.getContent(),
      title: 'Activity Summary'
    };
  }

}

module.exports = ActivitySummary;
