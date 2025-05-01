const axios = require('axios'); 

exports.handler = async (event, context) => {
  //query parameter
  const locationName = event.queryStringParameters.search;
  //.env variable 
  const API_SECRET = process.env.API_SECRET;
  //url 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&appid=${API_SECRET}`;
  
  //make weather request to api 
  try {
    //axios request
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
      
    }

  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}