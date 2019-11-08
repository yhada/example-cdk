const AWS = require("aws-sdk");

exports.handler = async (event: any) => {
  const responseBody = {
    message: "Hello world!"
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
  return response;
};
