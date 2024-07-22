/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const axios = require('axios');

exports.handler = async (event) => {
  const { address } = event.queryStringParameters;

  try {
    const response = await axios.get('https://geocoding.geo.census.gov', {
      params: {
        address,
        benchmark: 'Public_AR_Current',
        vintage: 'Current_Current',
        format: 'json',
      },
    });

    console.log('RESPONSE =>', response)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error),
    };
  }
};
