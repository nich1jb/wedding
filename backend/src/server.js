const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./api');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use('/api', apiRouter);
app.listen(port, () =>
  console.log(`Express server listening on port ${port}!`)
);
