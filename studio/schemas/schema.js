/* eslint-disable import/no-unresolved */
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import general from './documents/general';
import work from './documents/routes/work';
import project from './documents/routes/project';
import portableText from './objects/portableText';
import mainImage from './objects/mainImage';
import mainVideo from './objects/mainVideo';
import media from './objects/media';
import about from './documents/routes/about';
import post from './documents/routes/post';
import stories from './documents/routes/stories';
import info from './objects/info';
import headline from './objects/modules/headline';
import textblock from './objects/modules/textblock';

const documents = [general, work, stories, about, project, post];
const objects = [
  portableText,
  mainImage,
  mainVideo,
  media,
  info,
  headline,
  textblock,
];

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
});
