const groq = require('groq');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const frontpage = await client.fetch(groq`
    *[_type == "frontpage"][0]{
      title,
      lang,
      description,
      'asset': image.asset->url,
      'video': video.asset->playbackId
    }
  `);

  return frontpage;
};
