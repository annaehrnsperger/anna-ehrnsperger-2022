const fetch = require('node-fetch');
const base64 = require('base-64');

const ENDPOINT = '';
const AUTH_CREDENTIALS = `key:${process.env.KEY}`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST requests allowed',
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Please provide parameters',
    };
  }

  const { item1, item2 } = JSON.parse(event.body);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode(AUTH_CREDENTIALS)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item1,
        item2,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

/**
 * USAGE CLIENT
 */

// const res = await fetch('', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(),
// });
