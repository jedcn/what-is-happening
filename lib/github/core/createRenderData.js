const HtmlWrapper = require('./HtmlWrapper');
const describeTime = require('../core/describeTime');

const dayNameFormat = 'dddd MMMM Do';
const { format }  = require('date-fns');
const buildMapKey = (event) => {
  return format(event.getCreatedAt(), dayNameFormat);
};

const buildEventsGroupByDay = (events) => {
  const { List, OrderedMap } = require('immutable');

  const mapOfDayNamesToEvents = events.reduce((acc, event) => {
    const mapKeyForEvent = buildMapKey(event);
    if (acc.get(mapKeyForEvent)) {
      return acc.update(mapKeyForEvent, (list) => list.push(event));
    }
    return acc.set(mapKeyForEvent, List([ event ]));
  }, OrderedMap());
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
  const ActivitySummary = require('../summaries/ActivitySummary');
  const PullRequestRundown = require('../summaries/PullRequestRundown');
  const CommentRundown = require('../summaries/CommentRundown');
  return {
    begin: describeTime(begin),
    commentRundown: new CommentRundown(events, { server }).toJSON(),
    end: describeTime(end),
    daysOfUserEvents: buildEventsGroupByDay(events),
    activitySummary: new ActivitySummary(events).toJSON(),
    pullRequestRundown: new PullRequestRundown(events, { server }).toJSON(),
    title,
    users,
  }
};

module.exports = createRenderData;
