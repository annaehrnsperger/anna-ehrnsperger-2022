const groq = require('groq');
const client = require('../utils/sanityClient');
const { media } = require('../scripts/utils/dataStrings');

module.exports = async function () {
  const projects = await client.fetch(groq`
    *[_type == "project"]{
      title,
      'slug': slug.current,
      ${media}
      url
    }
  `);

  return projects;
};
