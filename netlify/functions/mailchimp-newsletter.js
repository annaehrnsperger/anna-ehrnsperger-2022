const fetch = require('node-fetch');
const base64 = require('base-64');

const ENDPOINT = `https://us5.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/`;
const AUTH_CREDENTIALS = `key:${process.env.MAILCHIMP_API_KEY}`;

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

  const { email, firstname, lastname } = JSON.parse(event.body);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode(AUTH_CREDENTIALS)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: `You've signed up to the mailing list!`,
        detail: data,
      }),
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
