exports.handler = async (event: any) => {
  const responseBody = {
    version: "v0.0.1"
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
  return response;
};
