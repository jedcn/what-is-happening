const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;
const describeTime = require('../core/describeTime');

const renderContentFromEvents = ({ begin, end, user, processedEvents }) => {
  const title = `${user} Activity`;
  const renderData = {
    begin: describeTime(begin),
    end: describeTime(end),
    userEvents: processedEvents.toJSON(),
    title
  };
  return renderTemplateWithData('userEvents/index', renderData);
};

module.exports = renderContentFromEvents;
