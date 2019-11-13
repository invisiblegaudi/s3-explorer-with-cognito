const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.get('/', (req, res) => res.render('index.pug', { title: 'S3 Explorer' }));

app.listen(port, () => console.log(`S3 Explorer listening on port ${port}`));

module.exports = app;
