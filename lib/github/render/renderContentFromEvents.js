const renderTemplateWithData = require('../core/renderHelpers').renderTemplateWithData;

const renderContentFromEvents = (renderData) => {
  return renderTemplateWithData('userEvents/index', renderData);
};

module.exports = renderContentFromEvents;
