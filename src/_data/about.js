const groq = require('groq');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const about = await client.fetch(groq`
    *[_type == "about"][0]{
      ...
    }
  `);

  return about;
};
