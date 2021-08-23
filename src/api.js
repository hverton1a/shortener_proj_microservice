const Q = require('q');
const FAIL={ error: 'invalid url' };

const Url = require('../models/models');


function getHostname(url){
  const regex=/^http[s]*:\/\/(?:www.)*(.+)\/?/gmi;
  let result = (regex.exec(url)[1].split('/'));
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
                            value = address.toString();
                            return value;
                });
}

async function create(url){
  try{
      const result = await Url.create({url:url});
  } catch (result){
      console.log('error: ', result.message);
      console.log('Field: ', result.errors[0].path, ' type:',result.errors[0].type);
  }
}


function is_http_https(url){
  const reg_http=/^http[s]*:.+/;
  if (url.match(reg_http)){
    return true;
  }
  return false;
}


async function check_url(url){
  console.log('check_url function received: ',url);
  var deferred = Q.defer();
  const dns = require('dns');

  if (is_http_https(url)){

    const dnsOptions={
      family:6,
      hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };

    newUrl=new URL(url);
     dns.lookup(newUrl.hostname,
          (err, address, family)=>{
            
            if (err){
              return deferred.resolve(null);
            }else{
              return deferred.resolve(url);
            }
      });
      //return deferred.promise;
  }else{
    deferred.resolve(null);
  }
  return deferred.promise;
}

async function find_or_create(url){
  if (url){
    try{
        const result = await Url.findOrCreate({attributes:['url','id'],
                        where:{url:url}});
        return ({original_url:result[0].dataValues.url,short_url:result[0].dataValues.id});
      } catch (result){
        return FAIL ;
    }
  }else{
    return FAIL;
  }
}

async function find(id){
  if(id){
    var deferred = Q.defer();
    await Url.findAll({attributes:['url','id'],
      where:{id:id}}).then((result)=>{
        const data={original_url:result[0].dataValues.url,short_url :result[0].dataValues.id};
        return deferred.resolve(data);})
        .catch((error)=>{console.log('erro no catch ', error); return deferred.resolve(FAIL);});

        return deferred.promise;

  }else{
    return FAIL;
  }
}

async function short_url(url){
  var deferred = Q.defer();
  var lookupPromise = check_url(url);

  lookupPromise.catch(response=>console.log(response)).then((response)=>
                        {
                            find_or_create(response)
                            .then((response)=>{ deferred.resolve(response);});
                          });
  return deferred.promise;

}

async function unshort_url(id){
  var deferred = Q.defer();
  var lookupPromise = find(id);

  lookupPromise.catch(response=>console.log(response)).
  then((response)=>{ deferred.resolve(response);});
                          
  return deferred.promise;
}


module.exports={ short_url, unshort_url };

