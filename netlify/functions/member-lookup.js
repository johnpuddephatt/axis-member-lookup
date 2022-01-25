var chargebee = require("chargebee");

const getCustomer = function (email) {
  return chargebee.customer
    .list({
      "email[is]": email,
    })
    .request(function (error, result) {});
};

const getUserSubscriptionCount = function (user_id) {
  return chargebee.subscription
    .list({
      "customer_id[is]": user_id,
      "status[is]": "active",
    })
    .request(function (error, result) {});
};

exports.handler = async (event) => {
  let email = event.queryStringParameters.email;

  chargebee.configure({
    site: "axisweb-test",
    api_key: "test_4S9iBXyvGhqA1Ib4cdDxg1z2cuKzxJjcu3m",
  });

  return getCustomer(email)
    .then(function (result) {
      if (!email) {
        throw new Error("No email!");
      }
      if (!result.list[0]) {
        throw new Error("Customer not found!");
      }
      return getUserSubscriptionCount(result.list[0]?.customer.id);
    })
    .then(function (result) {
      return {
        statusCode: 200,
        body: JSON.stringify(!!result.list.length),
      };
    })
    .catch(function (error) {
      return {
        statusCode: 404,
        body: "false",
      };
    });
};
