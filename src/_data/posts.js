const groq = require('groq');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const posts = await client.fetch(groq`
    *[_type == "post"]{
      title,
      'slug': slug.current
    }
  `);

  return posts;
};
