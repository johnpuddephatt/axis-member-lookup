var chargebee = require("chargebee");

exports.handler = async function () {
  chargebee.configure({
    site: "axisweb-test",
    api_key: process.env.CHARGEBEE_API_KEY,
  });

  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "hello world",
    }),
  };

  return chargebee.customer
    .list({
      email: "signmakers@email.com",
    })
    .request(function (error, result) {
      if (error) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: error.message,
          }),
        };
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: result.data,
          }),
        };
      }
    });
};
