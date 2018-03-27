const EventTypes = require('../core/EventTypes');
const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;

class ActivitySummary {

  constructor(events, config) {
    this.events = events;
    this.config = config;
  }

  getContent() {
    const pullRequestEvents = this.events.filter((e) => e.getEventType() === EventTypes.PullRequestEvent);
    const startingStats = {
      closeWithMerge: 0,
      closeWithNoMerge: 0,
      open: 0,
      totalCommits: 0,
      totalLinesAdded: 0,
      totalLinesRemoved: 0
    };
    const stats = pullRequestEvents.reduce((acc, event) => {
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
    const renderData = {
      headlines: [
        {
          description: `${stats.open} Pull Requests Opened`
        },
        {
          description: `${stats.closeWithMerge} Pull Requests Merged`
        },
        {
          description: `${stats.totalLinesAdded} Total Lines Added in Merged Pull Requests`
        },
        {
          description: `${stats.totalLinesRemoved} Total Lines Removed in Merged Pull Requests`
        },
        {
          description: `${stats.totalCommits} Total Commits in Merged Pull Requests`
        },
        {
          description: `${stats.closeWithNoMerge} Pull Requests Closed (without being merged)`
        },
      ]
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
