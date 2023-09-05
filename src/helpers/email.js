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

exports.sendEmail = async (from, to, subject, payload, htmlPayload) => {

    let params = {
        Source: from,
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

    if(htmlPayload) {
        params.Message.Body.Html = {
            Charset: 'UTF-8',
            Data: htmlPayload
        };
    }

    const data = await ses.sendEmail(params);

    return data;

};