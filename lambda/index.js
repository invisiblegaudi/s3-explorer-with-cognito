var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  signatureVersion: 'v4',
});


exports.handler = (event, context, callback) => {

  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket : 'BUCKET_NAME',
  };


  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function(err, data) {
    const files = data.Contents.map(file=>{
      file.downloadURL = s3.getSignedUrl('getObject', {Bucket:bucketParams.Bucket,Key:file.Key});
      return file
    });
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", files);
      callback(null, files);
    }
  });

};
