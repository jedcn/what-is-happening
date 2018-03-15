const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;
const describeTime = require('../core/describeTime');

const renderContentFromEvents = ({ begin, end, users, userEvents, summaries }) => {
  const title = `${users.join(', ')} Activity`;
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
