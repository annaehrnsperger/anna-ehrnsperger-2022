const groq = require('groq');
const client = require('../utils/sanityClient');
const { media } = require('../scripts/utils/dataStrings');

module.exports = async function () {
  const projects = await client.fetch(groq`
    *[_type == "project"]{
      ...,
      'slug': slug.current,
      ${media}
      medias[]{
        ...,
        'image': image.image.asset->url,
        'alt': image.alt,
        'video': video.video.asset->playbackId
      }
    }
  `);

  return projects;
};
