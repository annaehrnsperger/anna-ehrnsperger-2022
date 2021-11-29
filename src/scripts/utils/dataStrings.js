const link = `
  button{
    '_type': page->_type,
    'page': page->slug.current,
    url,
    text,
    type
  },
`;

const media = `
  media{
    ...,
    'image': image.image.asset->url,
    'alt': image.alt,
    'video': video.video.asset->playbackId,
  },
  `;

module.exports.link = link;
module.exports.media = media;

// TODO
// video.asset->playbackId
