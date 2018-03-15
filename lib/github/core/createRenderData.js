const HtmlWrapper = require('./HtmlWrapper');

const OpenPullRequestSummary = require('../summaries/OpenPullRequestSummary');
const MergedPullRequestSummary = require('../summaries/MergedPullRequestSummary');
const PullRequestCommentSummary = require('../summaries/PullRequestCommentSummary');

const createRenderData = ({ begin, end, events, host, users }) => {
  const server = host === 'api.github.com' ? 'github.com' : host;
  const eventsWithHtmlAsJSON = events.map((event) => new HtmlWrapper(event).toJSON()).toJSON();
  const summariesAsJSON = [
    new OpenPullRequestSummary(events, { server }).toJSON(),
    new MergedPullRequestSummary(events, { server }).toJSON(),
    new PullRequestCommentSummary(events, {server }).toJSON()
  ];
  return {
    begin,
    end,
    userEvents: eventsWithHtmlAsJSON,
    summaries: summariesAsJSON,
    users
  }
};

module.exports = createRenderData;
