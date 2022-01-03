const link = `
  button{
    '_type': page->_type,
    'page': page->slug.current,
    url,
    text,
    type
  },
`;

const mediaContent = `
  ...,
  'image': image.image.asset->url,
  'alt': image.alt,
  'video': video.video.asset->playbackId,
`;

const media = `
  media{
    ${mediaContent}
  },
  `;

module.exports.link = link;
module.exports.mediaContent = mediaContent;
module.exports.media = media;
