
const describeTime = require('../describeTime');

const EventTypes = require('./EventTypes');

const renderUserEvent =  require('./renderHelpers').renderUserEvent;
const renderIndex = require('./renderHelpers').renderIndex;

const buildLinkToViewCreatedItem = require('./linkBuilders').buildLinkToViewCreatedItem;
const buildLinkToViewPushEventCommits = require('./linkBuilders').buildLinkToViewPushEventCommits;

const removeRefsHeads = (ref) => ref.substring('refs/heads/'.length);

const buildUserEvent = (data, event, server) => {
  const eventLinkBuilder = eventLinkBuilders[event.type] || [];

  const userEvent = {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: renderUserEvent(event.type, data, event)
  };
  userEvent.links = eventLinkBuilder.map((builder) => builder(event, server));
  return userEvent;
};

const eventDescriptionBuilders = {
  [EventTypes.PushEvent]: (event, server) => {
    const customData = {
      branch: removeRefsHeads(event.payload.ref)
    };
    return buildUserEvent(customData, event, server);
  },
  [EventTypes.CreateEvent]: (event, server) => {
    const payload = event.payload;
    let typeOfCreatedThing;
    let nameOfCreatedThing;
    if (payload.ref_type === 'repository') {
      typeOfCreatedThing = `a new repository`;
      nameOfCreatedThing = event.repo.name;
    } else {
      typeOfCreatedThing = `a new ${payload.ref_type}`;
      nameOfCreatedThing = payload.ref;
    }
    const customData = {
      typeOfCreatedThing,
      nameOfCreatedThing,
    };
    return buildUserEvent(customData, event, server);
  }
};

const eventLinkBuilders = {
  [EventTypes.PushEvent]: [
    buildLinkToViewPushEventCommits
  ],
  [EventTypes.CreateEvent]: [
    buildLinkToViewCreatedItem
  ]
};

const defaultDescriptionBuilder = (event, server) => {
  return {
    created_at: describeTime(event.created_at),
    repo: event.repo.name,
    text: `Default: ${event.type}`
  }
};

const describeEvent = (event, server) => {
  const eventDescriptionBuilder = eventDescriptionBuilders[event.type] || defaultDescriptionBuilder;
  return eventDescriptionBuilder(event, server);
};

const reportOnUserEvents = (username, server, eventList) => {
  const title = username;
  const userEvents = eventList.map((event) => describeEvent(event, server));
  return renderIndex(title, userEvents);
};

module.exports = reportOnUserEvents;
