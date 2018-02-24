
const getDataForEvent = require('./eventData/getDataForEvent');
const getLinksForEvent = require('./linkBuilders/getLinksForEvent');

const describeTime = require('../describeTime');

const renderUserEventText = require('./renderHelpers').renderUserEventText;
const renderIndex = require('./renderHelpers').renderIndex;

const buildUserEvent = (data, event, server) => {
  return {
    created_at: describeTime(event.created_at),
    links: getLinksForEvent(event, server),
    repo: event.repo.name,
    text: renderUserEventText(event.type, data, event)
  };
};

const describeEvent = (event, server) => {
  const analyzedData = getDataForEvent(event, server);
  return buildUserEvent(analyzedData, event, server);
};

const reportOnUserEvents = (username, server, eventList) => {
  const title = username;
  const userEvents = eventList.map((event) => describeEvent(event, server));
  return renderIndex(title, userEvents);
};

module.exports = reportOnUserEvents;
