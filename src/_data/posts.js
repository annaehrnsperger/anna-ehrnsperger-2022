const groq = require('groq');
const client = require('../utils/sanityClient');
const { media } = require('../scripts/utils/dataStrings');

module.exports = async function () {
  const posts = await client.fetch(groq`
    *[_type == "post"]{
      ...,
      'slug': slug.current,
      ${media}
      content[]{
        ...,
        'image': image.image.asset->url,
        'alt': image.alt,
        'video': video.video.asset->playbackId
      }
    }
  `);

  return posts;
};
