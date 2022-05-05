const AWS = require('aws-sdk'),
  transcribe = new AWS.TranscribeService(),
  path = require('path'),
  LANGUAGE_CODE = process.env.LANGUAGE_CODE,
  OUTPUT_BUCKET = process.env.OUTPUT_BUCKET;

exports.handler = (event, context) => {
  console.log(event);
};