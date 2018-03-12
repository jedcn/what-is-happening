const buildEvent = require('./buildEvent');
const HtmlWrapper = require('./HtmlWrapper');

const buildEvents = (listOfMaps, server) => {
  return listOfMaps.map((map) => {
    return buildEvent(map, server);
  });
};

const processUserEventsData = ({ host, userEventsData }) => {
  const server = host === 'api.github.com' ? 'github.com' : host;
  const events = buildEvents(userEventsData, server);
  return events.map((event) => new HtmlWrapper(event).toJSON());
};

module.exports = processUserEventsData;
