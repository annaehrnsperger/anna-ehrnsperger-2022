const sanityImage = require('@sanity/image-url');
const sanityClient = require('./sanityClient');

module.exports = sanityImage(sanityClient);
