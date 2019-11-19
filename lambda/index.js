const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  signatureVersion: 'v4',
});


exports.handler = (event, context, callback) => {
  // Create the parameters for calling listObjects
  const bucketParams = {
    Bucket: 'BUCKET_NAME',
  };


  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, (err, data) => {
    const files = data.Contents.map((file) => {
      const { Bucket } = bucketParams;
      const { Key } = file;
      const downloadURL = s3.getSignedUrl('getObject', { Bucket, Key });
      Object.assign(file, { downloadURL });
      return file;
    });
    if (err) {
      throw new Error(err);
    } else {
      callback(null, files);
    }
  });
};
