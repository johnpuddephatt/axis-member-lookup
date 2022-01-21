var chargebee = require("chargebee");

exports.handler = async function () {
  chargebee.configure({
    site: "axisweb-test",
    api_key: process.env.CHARGEBEE_API_KEY,
  });

  // return {
  //   statusCode: 404,
  //   body: JSON.stringify({
  //     message: process.env.CHARGEBEE_API_KEY,
  //   }),
  // };

  return chargebee.customer.retrieve("16BSFKSeT75cn1OK").request(function(error,result) {
  if(error){
    return {
          statusCode: 404,
          body: JSON.stringify({
            message: error.message,
          }),
        };
  }
  else{
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: {
          customer: result.customer,
          card: result.card
        },
      }),
    };
  }

  // return chargebee.customer
  //   .list({
  //     "email[is]": "signmakers@email.com",
  //   })
  //   .request(function (error, result) {

  //     if (error) {
  //       return {
  //         statusCode: 404,
  //         body: JSON.stringify({
  //           message: error.message,
  //         }),
  //       };
  //     } else {
  //       return {
  //         statusCode: 200,
  //         body: JSON.stringify({
  //           message: result.data,
  //         }),
  //       };
  //     }
  //   });
};
