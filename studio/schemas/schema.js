/* eslint-disable import/no-unresolved */
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import general from './documents/general';
import page from './documents/routes/page';
import frontpage from './documents/routes/frontpage';
import overviewPage from './documents/routes/overviewPage';
import post from './documents/routes/post';
import portableText from './objects/portableText';
import seo from './objects/seo';
import mainImage from './objects/mainImage';
import mainVideo from './objects/mainVideo';
import socialLink from './objects/socialLink';
import localePortableText from './objects/localePortableText';
import localeString from './objects/localeString';
import media from './objects/media';
import simplePortableText from './objects/simplePortableText';

const documents = [general, frontpage, overviewPage, page, post];
const objects = [
  localeString,
  simplePortableText,
  portableText,
  localePortableText,
  seo,
  mainImage,
  mainVideo,
  socialLink,
  media,
];

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
});
