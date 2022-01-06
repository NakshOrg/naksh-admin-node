const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

let aws = require("@aws-sdk/client-ses");

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "ap-south-1",
  credentials:
  {
      accessKeyId: process.env.SES_ACCESS_KEY,
      secretAccessKey: process.env.SES_SECRET_KEY
    }
});

exports.sendEmail = asyncHandler(async (to, subject, payload) => {

    let params = {
        Source: process.env.FROM_EMAIL,
        Destination: {
            ToAddresses: [ to ]
        },
        Message: {
            Body: {
                Text: {
                    Data: `${payload}`
                },
            },
            Subject: {
                Data: subject
            }
        }
    };

    const data = await ses.sendEmail(params);

    return data;

});