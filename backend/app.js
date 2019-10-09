const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
const cors = require('cors');


const middleware = require('./middleware/authorization');

const login = require('./login');
const encode = require('./encode')

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  
// testing
app.get('/ping', (req, res, next)  => {
    res.status(200).json('pong!');
  });

  app.get('/status', (req, res, next)  => {
    if (!(req.headers && req.headers.authorization)) {
      return res.status(400).json({
        status: 'error'
      });
    }
    // simulate token decoding
    const header = req.headers.authorization.split(' ');
    const token = header[1];
    if (token === 'xyz0987654321') {
      res.status(200).json({
        status: 'success',
      });
    } else {
      res.status(401).json({
        status: 'error'
      });
    }
  });  
  
app.post('/login', login)
app.post('/encode', encode);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))