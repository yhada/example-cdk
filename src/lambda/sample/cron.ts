exports.handler = async (event: any, context: any) => {
  const now: Date = new Date();
  const revision: string = process.env.REVISION || "";

  const logs = {
    revision: process.env.REVISION,
    event: "cron",
    isoDate: now.toISOString(),
    time: now.getTime()
  };
  console.log(JSON.stringify(logs));
};
