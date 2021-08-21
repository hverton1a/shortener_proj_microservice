const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { compose, pipe } = require('./src/util');
const sqlite3 = require('sqlite3').verbose();
const Q = require('q');
const FAIL={ error: 'invalid url' };
//const database = require('./src/db.js');



path = Path.Combine(ApplicationData.Current.LocalFolder.Path, databaseName);

if (File.Exists(process.cwd()+'db.sqlite')) { 
  let db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
}
//const database = new Sequelize({
//  dialect: 'sqlite',
//  storage:'./db.sqlite',
//  define: {
//    freezeTableName: true
//  }
//});

//const sequelize = new Sequelize("./db.sqlite");

//(async()=>{
//            try {
//              await database.authenticate();
//              console.log('Connection has been established successfully.');
//            } catch (error) {
//              console.error('Unable to connect to the database:', error);
//            }
//})();

const Url = require('./models/models');
//const Url = database.define('Url',{
//  id: {
//    type: DataTypes.INTEGER,
//    allowNull:false,
//    autoIncrement: true,
//    primaryKey: true
//  },
//  url:{
//    type: DataTypes.STRING, 
//    allowNull:false,
//    unique:true
//  }
//});

/*desconsiderar utilizar a classe URL com o metodo URL.hostname*/
function getHostname(url){
  const regex=/^http[s]*:\/\/(?:www.)*(.+)\/?/gmi;
  let result = (regex.exec(url)[1].split('/'));
  //console.log(result[0]);
  return result[0];
}

function checkInputUrl (hostname){

  const dns = require('dns');

  const options = {
    family:6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
    value: ''
  };

  let result=false;

  return dns.lookup(hostname,
              options,
              (err, address, family,value) =>{
                          //result=address;
                          //console.debug('address: %j family: IPv%s', address, family);
                            value = address.toString();
                            return value;
                });

  //return result;
}

async function create(url){
  try{
      const result = await Url.create({url:url});
  } catch (result){
      console.log('error: ', result.message);
      console.log('Field: ', result.errors[0].path, ' type:',result.errors[0].type);
  }
}



//(async()=>{
//  Url.create({
//    url:'https://sequelize.org/master/manual/model-instances.html'
//  });
//})();

//url= ['https://sequelize.org/master/manual/model-instances.html', 'https://www.google.com.br','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'];

//create(map(url));
//try{
//  const createResult = url.map((item)=>create(item));
//}catch(createResult){
//  console.log('resultado do create with map',createResult);
//}


//(async () =>{
//          await Url.sync({ alter: true });
//          console.log("The table for the User model was just (re)created!");})();



//url = 'https://www.google.com.br';
//url = 'https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOrCreate'
//url = 'https://stackoverflow.com/questions/41336663/console-logresult-returns-object-object-how-do-i-get-result-name';
//url = 'https://www.google.com.br';

//short_url(url);
 // var deferred = Q.defer();
 // var lookupPromise = check_url(url);
//
 // result = lookupPromise.catch().then((response)=>{console.log(response);
 //   console.log(typeof response);
 //   find_or_create(response).catch().then((response)=>{deferred.resolve(response);console.log(response);return response;});});
//
 //   /*return*/console.log('esse ',result.);
  

//url = 'https://stackoverflow.coma/questions/41336663/console-logresult-returns-object-object-how-do-i-get-result-name';
//url = 'https://www.google.com.bra';

//  lookupPromise = check_url(url);
//  lookupPromise.catch().then((response)=>{console.log(response);
//    console.log(typeof response);
//    find_or_create(response).catch().then((response)=>console.log(response));});

//check_url(url).then((result)=>console.log(result));

//  find(url).then((result)=>{console.log(result);}).catch((err)=>{
//  console.log('deu erro, resultado do find',err);});
//find_or_create(url,Url).then((result)=>console.log(result));
//url.map((_url)=>{/*console.log(_url);*/
//  console.log(getHostname(_url));});
//
//console.log("================================");
//
////url.map((_url)=>{console.log(checkInputUrl(getHostname(_url)));});
////url.map((_url)=>{compose(console.log,checkInputUrl,getHostname)(_url);});
//console.log(checkInputUrl('sequelize.org'));
//console.log(checkInputUrl('google.com.br'));
//console.log(checkInputUrl('developer.mozilla.org'));
//Compose(console.log,checkInputUrl,getHostname)(_url);

//    url.map((_url)=>{console.log(_url)*/
//      console.log(checkInputUrl(getHostname(_url)));});

//database.close();

async function check_url(url){
  console.log('check_url function received: ',url);
  if (url){
    var deferred = Q.defer();
    //const URL = require('URL');
    const dns = require('dns');

    const dnsOptions={
      family:6,
      hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };

    newUrl=new URL(url);
   // let result={ error: 'invalid url' };
     dns.lookup(newUrl.hostname,
          (err, address, family)=>{
            
            if (err){
              //console.error('Error in dns. lookup received: ',JSON.stringify(err));
                return deferred.resolve(null);
            }else{
              //return find_or_create(url).then((data)=>{result={'url':data.url,'short':data.id};console.log(data, result);});
              return deferred.resolve(url);//find_or_create(url).then((data)=>{result={'url':data.url,'short':data.id};console.log(data, result);});

            }
      });
      return deferred.promise;
  }
}
// criar uma promise semelhante ao dns.lookup usando Q para reservar o retorno de data para composição do JSON
async function find_or_create(url){
  //console.log('find_or create  function received: ',url);
  if (url){
    try{
      const result = await Url.findOrCreate({attributes:['url','id'],
      //const result = await Url.findOne({attributes:['url','id'],
    where:{url:url}});
    //return result;
      //console.log(result[0].dataValues.url,);
      const data={original_url:result[0].dataValues.url,short_url:result[0].dataValues.id};
      //console.log('result: ',result[0].dataValues.url,' ', result[0].dataValues.id);
      console.log('data',data);
      return data;
    } catch (result){
      return FAIL ;
      //console.log('some error: ', result.message, result);
      //console.log('Field: ', result.errors[0].path, ' type:',result.errors[0].type);    
  }
  }else{
    return FAIL;
  }
  return null;
}

async function find(id){
  if(id){
    try{
        const result = await Url.findAll({attributes:['url','id'],
        //const result = await Url.findOne({attributes:['url','id'],
      where:{id:id}});
      //return result;
        //console.log(result[0].dataValues.url,);
        const data={original_url:result[0].dataValues.url,short_url :result[0].dataValues.id};
        //console.log('result: ',result[0].dataValues.url,' ', result[0].dataValues.id);
        //console.log('data',data);
        return data;
      } catch (error){
        //console.log('some error in function find: ', result.message, result);
        //console.log('Field: ', result.errors[0].path, ' type:',result.errors[0].type);    
        //const res = { error: 'invalid url' };
        return FAIL;
    }
  }else{
    return FAIL;
  }
}

async function json_response(url){
  lookupPromise = check_url(url);
  lookupPromise.catch()
                .then((response)=>
                        {/*console.log(response);
                            console.log(typeof response);*/
                            find_or_create(response)
                            .catch().
                            then((response)=>console.log(response));
                          });
}

function short_url(url){
  var deferred = Q.defer();
  var lookupPromise = check_url(url);

  lookupPromise.catch()
                .then((response)=>
                        {/*console.log(response);
                            console.log(typeof response);*/
                            find_or_create(response)
                            .catch().
                            then((response)=>{deferred.resolve(response);});
                          });
  return deferred.promise;

}

function unshort_url(id){
  //var deferred = Q.defer();
  //var result = find(id);
  //result.catch().then(res=>console.log(res));
  return find(id);
}

unshort_url(1);

module.exports={ short_url, unshort_url };

