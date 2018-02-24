
const fs = require('fs');

const Mustache = require('mustache');

const templateContent = (templateName) => {
  try {
    const template = `${__dirname}/../../templates/userEvents/${templateName}.mustache`;
    return fs.readFileSync(template).toString();
  } catch (err) {
    const template = `${__dirname}/../../templates/userEvents/DefaultForAllEvents.mustache`;
    return fs.readFileSync(template).toString();
  }
};

const renderTemplateWithData = (templateName, renderData) => {
  const content = templateContent(templateName);
  return Mustache.render(content, renderData);
};

const renderUserEventText = (templateName, customData, event) => {
  const baseData = {
    actor: event.actor,
    event,
    payload: event.payload
  };
  const renderData = Object.assign({}, baseData, customData);
  return renderTemplateWithData(templateName, renderData);
};

module.exports.renderUserEventText = renderUserEventText;

const renderIndex = (title, userEvents) => {
  const renderData = {
    userEvents,
    title
  };
  return renderTemplateWithData('index', renderData);
};

module.exports.renderIndex = renderIndex;
