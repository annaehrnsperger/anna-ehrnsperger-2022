/* eslint-disable import/no-unresolved */
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import general from './documents/general';
import work from './documents/routes/work';
import project from './documents/routes/project';
import portableText from './objects/portableText';
import seo from './objects/seo';
import mainImage from './objects/mainImage';
import mainVideo from './objects/mainVideo';
import socialLink from './objects/socialLink';
import media from './objects/media';
import simplePortableText from './objects/simplePortableText';
import about from './documents/routes/about';
import post from './documents/routes/post';
import stories from './documents/routes/stories';
import info from './objects/info';

const documents = [general, work, stories, about, project, post];
const objects = [
  simplePortableText,
  portableText,
  seo,
  mainImage,
  mainVideo,
  socialLink,
  media,
  info,
];

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
});
