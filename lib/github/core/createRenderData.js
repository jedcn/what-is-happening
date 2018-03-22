const HtmlWrapper = require('./HtmlWrapper');
const describeTime = require('../core/describeTime');

const buildSummaries = (events, server) => {
  const OpenPullRequestSummary = require('../summaries/OpenPullRequestSummary');
  const MergedPullRequestSummary = require('../summaries/MergedPullRequestSummary');
  const PullRequestCommentSummary = require('../summaries/PullRequestCommentSummary');

  return [
    new OpenPullRequestSummary(events, { server }).toJSON(),
    new MergedPullRequestSummary(events, { server }).toJSON(),
    new PullRequestCommentSummary(events, {server }).toJSON()
  ];
};

const buildEventsGroupByDay = (events) => {
  const { List, Map } = require('immutable');
  const { format }  = require('date-fns');

  const dayNameFormat = 'dddd MMMM Do';
  const mapOfDayNamesToEvents = events.reduce((acc, event) => {
    const dayName = format(event.getCreatedAt(), dayNameFormat);
    if (acc.get(dayName)) {
      return acc.update(dayName, (list) => list.push(event));
    }
    return acc.set(dayName, List([ event ]));
  }, Map());
  const eventsGroupedByDayName = [];
  for(let dayName of mapOfDayNamesToEvents.keys()) {
    const eventsThatDayList = mapOfDayNamesToEvents.get(dayName);
    const eventsWithHtmlAsJSONThatDay = eventsThatDayList.map((event) => new HtmlWrapper(event).toJSON()).toJSON();
    const mapDescribingThatDay = {
      dayName,
      eventsThatDay: eventsWithHtmlAsJSONThatDay.length,
      userEvents: eventsWithHtmlAsJSONThatDay
    };
    eventsGroupedByDayName.push(mapDescribingThatDay);
  }
  return eventsGroupedByDayName;
};

const createRenderData = ({ begin, end, events, host, title, users }) => {
  const server = host === 'api.github.com' ? 'github.com' : host;
  return {
    begin: describeTime(begin),
    end: describeTime(end),
    daysOfUserEvents: buildEventsGroupByDay(events),
    summaries: buildSummaries(events, server),
    title,
    users,
  }
};

module.exports = createRenderData;
