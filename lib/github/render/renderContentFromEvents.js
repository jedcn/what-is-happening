const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;

const renderContentFromEvents = ({ user, processedEvents }) => {
  const title = `${user} Activity`;
  const renderData = {
    userEvents: processedEvents.toJSON(),
    title
  };
  return renderTemplateWithData('userEvents/index', renderData);
};

module.exports = renderContentFromEvents;
