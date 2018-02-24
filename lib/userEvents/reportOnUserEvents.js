
const analyzeEvent = require('./eventAnalyzers/analyzeEvent');
const getLinkBuilderForEvent = require('./linkBuilders/getLinkBuilderForEvent');

const describeTime = require('../describeTime');

const renderUserEventText = require('./renderHelpers').renderUserEventText;
const renderIndex = require('./renderHelpers').renderIndex;

const buildUserEvent = (data, event, server) => {
  const eventLinkBuilder = getLinkBuilderForEvent(event);

  const userEvent = {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: renderUserEventText(event.type, data, event)
  };
  userEvent.links = eventLinkBuilder.map((builder) => builder(event, server));
  return userEvent;
};

const describeEvent = (event, server) => {
  const analyzedData = analyzeEvent(event, server);
  return buildUserEvent(analyzedData, event, server);
};

const reportOnUserEvents = (username, server, eventList) => {
  const title = username;
  const userEvents = eventList.map((event) => describeEvent(event, server));
  return renderIndex(title, userEvents);
};

module.exports = reportOnUserEvents;
