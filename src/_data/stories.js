const groq = require('groq');
const { media } = require('../scripts/utils/dataStrings');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const stories = await client.fetch(groq`
    *[_type == "stories"][0]{
      posts[]->{
        ${media}
        previewSize,
        title,
        type,
        slug
      }
    }
  `);

  return stories;
};
