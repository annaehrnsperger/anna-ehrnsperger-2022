const groq = require('groq');
const { media } = require('../scripts/utils/dataStrings');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const work = await client.fetch(groq`
    *[_type == "work"][0]{
      projects[]->{
        ...,
        ${media}
      }
    }
  `);

  return work;
};
