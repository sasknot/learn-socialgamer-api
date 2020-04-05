const fs = require('fs');

module.exports = function() {
  const filePath = (process.env.ENV_CONFIG_PATH || '.') + '/socialgamer-api.json';
  const content = fs.readFileSync(filePath, 'utf8');

  console.log('Loading configuration file %s', filePath);

  return JSON.parse(content);
}();
