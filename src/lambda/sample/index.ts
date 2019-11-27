exports.handler = async (event: any, context: any) => {
  const now: Date = new Date();

  const logs = {
    revision: process.env.REVISION,
    event: 'survey',
    queryParams: event,
    isoDate: now.toISOString(),
    time: now.getTime()
  };
  console.log(JSON.stringify(logs));
  const response = {
    statusCode: 200,
    body: JSON.stringify(logs)
  };
  return response;
};
