const BaseSummary = require('./BaseSummary');
const EventTypes = require('../core/EventTypes');
const { link, hrefForRepo } = require('../core/linkUtils');
const pluralize = require('../core/pluralize');

class MergedPullRequestSummary extends BaseSummary {

  constructor(events, config) {
    super(events, config);
  }

  getEventFilter(event) {
    const type = event.getEventType();
    return type === EventTypes.PullRequestEvent && event.getAction() === 'closed';
  }

  getDescription() {
    const repoLinks = this.getFilteredRepoLinks();
    const filteredEvents = this.getFilteredEvents();
    return `${pluralize(filteredEvents.size, 'pull request')} merged into ${pluralize(repoLinks.size, 'repo')}: ${repoLinks.join(', ')}`;
  }

  getSummaryItems() {
    const { server } = this.config;
    return this.getFilteredEvents().map((event) => {
      return {
        context: link(hrefForRepo(server, event.getRepo()), event.getRepo()),
        description: link(event.getPullRequestUrl(), event.getTitle())
      }
    });
  }

  getTitle() {
    return 'Merged Pull Requests';
  }

}

module.exports = MergedPullRequestSummary;
