const axios = require('axios');

exports.handler = async (event, context) => {
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

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
