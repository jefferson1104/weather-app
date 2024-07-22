import axios from "axios";

export default async (request, context) => {
    console.log('Query Parameters:', request);
    const { address } = request.queryStringParameters;

    if (!address) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Address parameter is required' })
        };
    }

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
        console.log('Request Options:', options);
        const response = await axios.request(options);
        console.log('API Response:', response.data);

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
            body: JSON.stringify({ message: 'Internal Server Error', error })
        };
    }
}
