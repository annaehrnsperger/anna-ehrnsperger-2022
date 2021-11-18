const fetch = require('node-fetch');

const ENDPOINT = '';

exports.handler = async () => {
  try {
    const response = await fetch(ENDPOINT, {
      headers: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
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
