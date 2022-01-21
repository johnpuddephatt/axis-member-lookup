exports.handler = async function () {
  var chargebee = require("chargebee");
  chargebee.configure({
    site: "axisweb-test",
    api_key: process.env.CHARGEBEE_API_KEY,
  });
  chargebee.customer
    .list({
      email: "signmakers@email.com",
    })
    .request(function (error, result) {
      if (error) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Not found",
          }),
        };
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: result,
          }),
        };
      }
    });
};
