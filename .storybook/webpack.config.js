const path = require('path');

module.exports = ({ config }) => {
  // Resolve the alias for '@/styles/fonts'
  config.resolve.alias['@'] = path.resolve(__dirname, '../src/');

  // Return the updated Storybook configuration
  return config;
};
