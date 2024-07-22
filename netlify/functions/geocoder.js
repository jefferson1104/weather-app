/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// netlify/functions/geocode.js
const axios = require('axios');

exports.handler = async function(event, context) {
  const { address } = event.queryStringParameters;

  const options = {
    method: 'GET',
    url: 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress',
    params: {
      address,
      benchmark: 'Public_AR_Current',
      vintage: 'Current_Current',
      format: 'json'
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.result.addressMatches[0];

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'This place does not exist. Please try again' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in serverless function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
