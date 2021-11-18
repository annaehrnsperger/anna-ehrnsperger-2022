const fetch = require('node-fetch');
require('dotenv').config();

const productsQuery = `
  {
    products(first: 100) {
      edges {
        node {
          id
          collections(first: 20) {
            edges{
              node {
                id
                handle
                title
                descriptionHtml
              }
            }
          }
          title
          handle
          availableForSale
          description
          descriptionHtml
          productType
          tags
          vendor
          updatedAt
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          images(first: 20) {
            edges {
              node {
                altText
                originalSrc
                transformedSrc(maxWidth: 10, maxHeight: 10)
              }
            }
          }
          variants(first: 30) {
            edges {
              node {
                id
                availableForSale
                priceV2 {
                  amount
                }
                image {
                  originalSrc
                }
                sku
                title
                weight
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = function () {
  return fetch(
    `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/api/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        Accept: 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.SHOPIFY_ACCESS_TOKEN}`,
      },
      body: productsQuery,
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const { edges } = res.data.products;
      const products = edges.map((node) => node.node);
      return products;
    });
};
