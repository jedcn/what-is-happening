const BaseSummary = require('./BaseSummary');
const EventTypes = require('../core/EventTypes');
const { link } = require('../core/linkUtils');
const Set = require('immutable').Set;
const pluralize = require('../core/pluralize');

class PullRequestCommentSummary extends BaseSummary {

  constructor(events, config) {
    super(events, config);
  }

  getEventFilter(event) {
    const type = event.getEventType();
    return type === EventTypes.PullRequestReviewCommentEvent && event.getAction() === 'created';
  }

  getFilteredPullRequestHrefs() {
    const mapOfPullRequests = this.getFilteredEvents().reduce((acc, event) => {
      const pullRequestHref = event.getPullRequestHref();
      acc[pullRequestHref] = true;
      return acc;
    }, {});
    return Set.fromKeys(mapOfPullRequests);
  }

  getDescription() {
    const repoLinks = this.getFilteredRepoLinks();
    const filteredEvents = this.getFilteredEvents();
    const pullRequestHrefs = this.getFilteredPullRequestHrefs();
    return `${pluralize(filteredEvents.size, 'comment')} for ${pluralize(pullRequestHrefs.size, 'pull request')} against ${pluralize(repoLinks.size, 'repo')}: ${repoLinks.join(', ')}`;
  }

  getSummaryItems() {
    return this.getFilteredEvents().map((event) => {
      return {
        context: link(event.getPullRequestHref(), event.getTitle()),
        description: link(event.getCommentHref(), event.getBody())
      }
    });
  }

  getTitle() {
    return 'Comments on Pull Requests';
  }

}

module.exports = PullRequestCommentSummary;
