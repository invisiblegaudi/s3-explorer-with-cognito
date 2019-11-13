const express = require('express');
const app = express();
const port = 3000;
const { defaultApiFiles } = require('./files');
const { auth } = require('./auth');

app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index.pug', { title: 'S3 Explorer' }));

app.get('/:bucketName', async (req, res) => {
  const { bucketName } = req;
  const accessToken = await auth();
  const files = await defaultApiFiles(accessToken, bucketName);

  res.render('files.pug', { bucketName, files })
});


app.listen(port, () => console.log(`S3 Explorer listening on port ${port}`));

module.exports = app;
