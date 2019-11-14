exports.handler = async (event: any, context: any) => {
  // console.log(JSON.stringify({ event: event, context: context }, null, 2));

  const logs = {
    event: "survey",
    queryParams: event.queryStringParameters,
    time: new Date().getTime()
  };

  console.log(JSON.stringify(logs));
  const responseBody = {
    message: "Hello world!"
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
  return response;
};
