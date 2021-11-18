const client = require('@sanity/client');

module.exports = client({
  projectId: 'n9rmz3ku',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: false,
});
