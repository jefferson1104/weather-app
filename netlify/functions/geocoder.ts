/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { address, benchmark, vintage, format } = event.queryStringParameters as any;

  const apiUrl = new URL('https://geocoding.geo.census.gov/geocoder/locations/onelineaddress');
  apiUrl.searchParams.append('address', address || '');
  apiUrl.searchParams.append('benchmark', benchmark || '');
  apiUrl.searchParams.append('vintage', vintage || '');
  apiUrl.searchParams.append('format', format || '');

  try {
    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.log('SERVER LESS FUNCTION ERROR =>', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data from Census API' }),
    };
  }
};

export { handler };
