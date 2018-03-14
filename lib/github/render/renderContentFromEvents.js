const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;
const describeTime = require('../core/describeTime');

const renderContentFromEvents = ({ begin, end, user, userEvents, summaries }) => {
  const title = `${user} Activity`;
  const renderData = {
    begin: describeTime(begin),
    end: describeTime(end),
    summaries,
    title,
    userEvents
  };
  return renderTemplateWithData('userEvents/index', renderData);
};

module.exports = renderContentFromEvents;
