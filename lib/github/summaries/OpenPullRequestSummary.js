const BaseSummary = require('./BaseSummary');
const EventTypes = require('../core/EventTypes');
const { link, hrefForRepo } = require('../core/linkUtils');
const pluralize = require('../core/pluralize');

class OpenPullRequestSummary extends BaseSummary {

  constructor(events, config) {
    super(events, config);
  }

  getEventFilter(event) {
    const type = event.getEventType();
    return type === EventTypes.PullRequestEvent && event.getAction() === 'opened';
  }

  getDescription() {
    const repoLinks = this.getFilteredRepoLinks();
    const filteredEvents = this.getFilteredEvents();
    return `${pluralize(filteredEvents.size, 'pull request')} opened against ${pluralize(repoLinks.size, 'repo')}: ${repoLinks.join(', ')}`;
  }

  getSummaryItems() {
    const { server } = this.config;
    return this.getFilteredEvents().map((event) => {
      return {
        context: link(hrefForRepo(server, event.getRepo()), event.getRepo()),
        description: link(event.getPullRequestHref(), event.getTitle())
      }
    });
  }

  getTitle() {
    return 'Opened Pull Requests';
  }

}

module.exports = OpenPullRequestSummary;
