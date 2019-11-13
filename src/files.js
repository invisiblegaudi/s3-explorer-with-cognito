const { ApiGatewayUrl } = require('../config/aws.json');
const { loadBucket } = require('./helpers/aws-s3-files');

const defaultApiFiles = (...args) => loadBucket(ApiGatewayUrl, ...args);

module.exports = {
  defaultApiFiles,
};
