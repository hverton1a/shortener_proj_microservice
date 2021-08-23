require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {short_url, unshort_url} = require('./tut.js');

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
  console.log(req.ip,' ',req.path,' ',req.body.url,' ', Date().toString());
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async (req, res) =>{
  //find(url) -> se exite retorna json com {original_url:url,short_url:id}
  console.log('post ',req.body.url);
  var short = short_url(req.body.url);
  short.then((response)=>res.json(response));
  //short_url(req.body.url).then((result=>res.json(result)));
  //res.json({"esse":(short_url(req.body.url)).url,"aquele":(short_url(req.body.url)).id});
  //console.log(req.params.URL);
  //console.log(req.body);
  //console.log(req.method);
  //console.log(req.path);
  //console.log(req.body);
  //res.send('Post ');
});

app.get('/api/shorturl/:SHORT', async (req, res,next) => {
  //console.log('get ',req.params.SHORT);
  //find(id) -> se exite retorna a url do db em uma nova pagina
  //var send_url = await unshort_url(req.params.SHORT);
  //console.log('send_url ',send_url);
  //send_url.then((response)=>{console.log('send_url ',send_url,' ','response.url',' ',response.url);res.redirect(response.url);});

  //await unshort_url(req.params.SHORT).then((response)=>{console.log('send_url ',send_url,' ','response.url',' ',response.url);res.redirect(response.url);});
 
  console.log('get ',req.params.SHORT);
  var unshort = unshort_url(req.params.SHORT);
  unshort.catch((error,response)=>{console.log(error); res.json(response);})
  .then((response)=>{
    //console.log(response);
    //console.log(response.original_url);
    //console.log(response.short_url);
   // try{
    //if(response.original_url){
      console.log('unshort ',unshort,' ','response.SHORT',' ',response.original_url);
        res.redirect(response.original_url);
  //}else{console.log(error, ' ', response);res.json(response);}//}catch(error){console.log(error, ' ', response);res.json(response);}
});



  //console.log(req.params.URL);
  //res.redirect('https://www.google.com');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
