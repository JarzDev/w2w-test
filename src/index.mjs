

const handler = async (event) => {
  try {
    const response = {
      statusCode: 200,
          headers: {
              'Access-Control-Allow-Origin':'*', // Required for CORS support to work 
              'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS 
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
                  },
          body: JSON.stringify({
              "message": "Hola People job",
          }, null, 2),
  };
  return response;
  } catch (err) {
    console.log('error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Ha ocurrido un error al procesar los datos" })
    };
  }
};  

export { handler };