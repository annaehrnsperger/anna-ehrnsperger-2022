const blocksToHtml = require('@sanity/block-content-to-html');
const builder = require("./src/utils/imageUrl");
const fs = require("fs");

function sanityImage(asset, alt="Image") {
  const WIDTHS =  [600, 1200, 2400];

  const srcSet = WIDTHS.map(function (width) {
    return `${builder
      .image(asset)
      .width(width)
      .auto("format")
      .fit("max")
      .url()} ${width}w`;
  });

  const defaultSrcSet = srcSet.join(',');
  const dimensions = asset.split('-')[1].split('x');
  const width = dimensions[0];
  const height = dimensions[1].split('.')[0];

  return `
    <img
      class="lazyload"
      width="${width}"
      height="${height}"
      src="${builder.image(asset).width(100).blur(50).url()}"
      data-src="${builder.image(asset).url()}"
      data-srcset="${defaultSrcSet}" 
      data-sizes="auto"
      alt="${alt}"
    />
  `;
}
  
function shopifyImage(asset, blur, alt="Image") {
  return `
  <img
    class="lazyload"
    src="${blur}"
    data-src="${asset}"
    alt="${alt}"
  />
  `;
}

function filterBlocksToHtml(blocks) {
  const h = blocksToHtml.h
  const serializers = {
    marks: {
      pageLink: ({ mark, children }) =>
        h('a', {
          href: `/${mark.pageSlug}`,
          'data-id': mark.id
          },
          children,
      ),
      externalLink: ({ mark, children }) =>
        h('a', {
            href: mark.href,
            target: '_blank',
            rel: 'noopener noreferrer',
            'data-id': mark.id
          },
          children,
      ),
    },
  }

  return blocksToHtml({ blocks, serializers })
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': '/assets' });

  eleventyConfig.addWatchTarget('./public/main.js');
  eleventyConfig.addWatchTarget('./public/index.css');
  
  eleventyConfig.setWatchThrottleWaitTime(500);
  
  eleventyConfig.addShortcode('img', sanityImage);
  eleventyConfig.addShortcode('shopImg', shopifyImage);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addFilter('richtext', filterBlocksToHtml);
  
  eleventyConfig.setBrowserSyncConfig({
    notify: true,
    files: ['./public/main.js', './public/index.css'],
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('./public/404/index.html');
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'public'
    },
  }
};