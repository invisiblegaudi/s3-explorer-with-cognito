const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.get('/', (req, res) => res.send('S3 Explorer init!'));

app.listen(port, () => console.log(`S3 Explorer listening on port ${port}`));

module.exports = app;
