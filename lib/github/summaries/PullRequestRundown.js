const { link, hrefForRepo } = require('../core/linkUtils');
const describeTime = require('../core/describeTime');

const EventTypes = require('../core/EventTypes');
const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;

class PullRequestRundown {

  constructor(events, config) {
    this.events = events;
    this.config = config;
  }

  filterEventsBy(eventTypes) {
    return this.events.filter((e) => eventTypes.includes(e.getEventType()));
  }

  buildPullRequestsData(pullRequestEvents) {
    const pullRequestMap = pullRequestEvents.reduce((acc, event) => {
      const url = event.getPullRequestUrl();
      if (!acc[url]) {
        const repoName = event.getRepo();
        const { server } = this.config;
        acc[url] = {
          pullRequestLink: link(url, event.getTitle()),
          repoLink: link(hrefForRepo(server, repoName), repoName),
          openDate: 'Previously Opened',
          closeDate: 'Not Yet Closed'
        }
      }
      const actionType = event.getAction();
      const pullRequestData = acc[url];
      if (actionType === 'opened') {
        pullRequestData.openDate = describeTime(event.getCreatedAt());
      }
      if (actionType === 'closed') {
        pullRequestData.closeDate = describeTime(event.getCreatedAt());
      }
      return acc;
    }, {});
    return Object.values(pullRequestMap);
  }

  getContent() {
    const pullRequestEvents = this.filterEventsBy([EventTypes.PullRequestEvent]);

    const renderData = {
      pullRequests: this.buildPullRequestsData(pullRequestEvents)
    };
    return renderTemplateWithData('userEvents/pullRequestRundown', renderData);
  }

  toJSON() {
    return {
      content: this.getContent()
    };
  }

}

module.exports = PullRequestRundown;
