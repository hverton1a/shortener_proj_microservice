require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {short_url, unshort_url} = require('./src/api.js');
const log = require('./src/util.js');

// Basic Configuration
const port = process.env.PORT||3030;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

//to get access to post body request data
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get('/', async (req, res) =>{
  log(req);
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async (req, res) =>{
  log(req);
  var short = short_url(req.body.url);
  short.then((response)=>res.json(response));
});

app.get('/api/shorturl/:SHORT', async (req, res,next) => { 
  log(req);
  var unshort = unshort_url(req.params.SHORT);

  unshort.catch((error,response)=>{console.log(error); res.json(response);})
          .then((response)=>{
                    res.redirect(response.original_url);
          });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
