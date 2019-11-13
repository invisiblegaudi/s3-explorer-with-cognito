const fetch = require('node-fetch');

const loadBucket = async (api, accessToken, S3Bucket) => {
  let files;
  try {
    files = await fetch(`${api}/${S3Bucket}`, {
      headers: {
        Authorization: accessToken,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
  return files.json();
};

module.exports = {
  loadBucket,
};
