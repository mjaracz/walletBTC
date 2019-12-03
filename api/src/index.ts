import wallet from './routes/wallet.routes';

import express from 'express';
import parser from 'body-parser';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Vary': 'Origin',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me'
  });
  next();
});

app.use('/api', wallet);
app.use((req, res) => {
  res.status(404);
  res.send(JSON.stringify({'message': 'route not handler'}));
});

app.listen(port, () => {
  console.log('server started on port ' + port)
});
