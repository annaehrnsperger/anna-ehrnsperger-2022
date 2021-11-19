const client = require('@sanity/client');

module.exports = client({
  projectId: 'lx8z3k6n',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: false,
});
