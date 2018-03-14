const { link, hrefForRepo } = require('../core/linkUtils');
const Set = require('immutable').Set;

class BaseSummary {

  constructor(events, config) {
    this.events = events;
    this.config = config;
  }

  getFilteredEvents() {
    return this.events.filter((event) => this.getEventFilter(event));
  }

  getEventFilter(event) {
    return true;
  }

  getTitle() {
    return 'BaseSummary Title';
  }

  getDescription() {
    return 'BaseSummary Description';
  }

  getFilteredRepos() {
    const mapOfRepos = this.getFilteredEvents().reduce((acc, event) => {
      const eventRepo = event.getRepo();
      acc[eventRepo] = true;
      return acc;
    }, {});
    return Set.fromKeys(mapOfRepos);
  }

  getFilteredRepoLinks() {
    const {server} = this.config;
    const filteredRepos = this.getFilteredRepos();
    return filteredRepos.map((repo) => link(hrefForRepo(server, repo), repo))
  }

  getSummaryItems() {
    return [];
  }

  additionalJSON() {
    return {}
  }

  toJSON() {
    const base = {
      description: this.getDescription(),
      repos: this.getFilteredRepos().toJSON(),
      items: this.getSummaryItems().toJSON(),
      title: this.getTitle()
    };
    return Object.assign(base, this.additionalJSON());
  }
}

module.exports = BaseSummary;
