
const fs = require('fs');

const Mustache = require('mustache');

const templateContent = (templateName) => {
  const template = `${__dirname}/templates/userEvents/${templateName}.mustache`;
  return fs.readFileSync(template).toString();
};

const renderTemplateWithData = (templateName, renderData) => {
  const content = templateContent(templateName);
  return Mustache.render(content, renderData);
};

const renderUserEvent = (templateName, customData, event) => {
  const baseData = {
    actor: event.actor,
    payload: event.payload
  };
  const renderData = Object.assign({}, baseData, customData);
  return renderTemplateWithData(templateName, renderData);
};

module.exports.renderUserEvent = renderUserEvent;

const renderIndex = (title, userEvents) => {
  const renderData = {
    userEvents,
    title
  };
  return renderTemplateWithData('index', renderData);
};

module.exports.renderIndex = renderIndex;
