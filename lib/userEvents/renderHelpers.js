const fs = require('fs');
const Mustache = require('mustache');

const renderStringWithData = (mustacheString, renderData) => {
  return Mustache.render(mustacheString, renderData);
};

const templateContent = (templatePath) => {
  const template = `${__dirname}/../../templates/${templatePath}.mustache`;
  return fs.readFileSync(template).toString();
};

const renderTemplateWithData = (templatePath, renderData) => {
  const content = templateContent(templatePath);
  return Mustache.render(content, renderData);
};

module.exports.renderStringWithData = renderStringWithData;
module.exports.renderTemplateWithData = renderTemplateWithData;
