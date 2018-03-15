const BaseSummary = require('./BaseSummary');
const EventTypes = require('../core/EventTypes');
const { link } = require('../core/linkUtils');
const Set = require('immutable').Set;
const pluralize = require('../core/pluralize');

class IssueCommentSummary extends BaseSummary {

  constructor(events, config) {
    super(events, config);
  }

  getEventFilter(event) {
    const type = event.getEventType();
    return type === EventTypes.IssueCommentEvent && event.getAction() === 'created';
  }

  getFilteredIssueHrefs() {
    const mapOfPullRequests = this.getFilteredEvents().reduce((acc, event) => {
      const pullRequestHref = event.getPullRequestHref();
      acc[pullRequestHref] = true;
      return acc;
    }, {});
    return Set.fromKeys(mapOfPullRequests);
  }

  getDescription() {
    const repos = this.getFilteredRepos();
    const filteredEvents = this.getFilteredEvents();
    const issueHrefs = this.getFilteredIssueHrefs();
    return `${pluralize(filteredEvents.size, 'comment')} for ${pluralize(issueHrefs.size, 'issue')} against ${pluralize(repos.size, 'repo')}: ${repos.join(', ')}`;
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

module.exports = IssueCommentSummary;
