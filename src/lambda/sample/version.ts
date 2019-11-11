exports.handler = async (event: any) => {
  const responseBody = {
    revision: process.env.REVISION || ""
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };

  return response;
};
