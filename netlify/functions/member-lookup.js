var chargebee = require("chargebee");
const url = require("url");
// const { customer } = require("chargebee/lib/resources/api_endpoints");

exports.handler = async (event) => {
  if (!event.queryStringParameters.email) {
    return {
      statusCode: 404,
      body: "Query parameter 'email' was missing.",
    };
  }
  chargebee.configure({
    site: "axisweb-test",
    // api_key: process.env.CHARGEBEE_API_KEY,
    api_key: "test_4S9iBXyvGhqA1Ib4cdDxg1z2cuKzxJjcu3m",
  });

  return chargebee.customer
    .list({
      "email[is]": event.queryStringParameters.email,
    })
    .request(function (error, result) {})
    .then(function (result) {
      return chargebee.subscription
        .list({
          "customer_id[is]": result.list[0].customer.id,
          "status[is]": "active",
        })
        .request(function (error, result) {})
        .then(function (result) {
          return {
            statusCode: 200,
            body: JSON.stringify(!!result.list.length),
          };
        });
    });
};
