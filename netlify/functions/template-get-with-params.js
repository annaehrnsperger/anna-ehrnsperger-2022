const fetch = require('node-fetch');

const ENDPOINT = '';

exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Please provide parameters',
    };
  }

  const { item1, item2 } = JSON.parse(event.body);

  try {
    const response = await fetch(ENDPOINT, {
      headers: {
        Authorization: '',
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
