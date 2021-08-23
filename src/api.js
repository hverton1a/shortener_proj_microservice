const Q = require('q');
const Url = require('../models/models');

const FAIL={ error: 'invalid url' };


function is_http_https(url){
  if (url.match(/^http[s]*:.+/)){  return true;  }

  return false;
}


async function check_url(url){
  const dns = require('dns');
  var deferred = Q.defer();

  if (is_http_https(url)){
    //newUrl=new URL(url);
     dns.lookup(new URL(url).hostname,
          (err, address, family)=>{            
            if (err){
              deferred.resolve(null);
              //return deferred.resolve(null);
            }else{
               deferred.resolve(url);
              //return deferred.resolve(url);
            }
      });
  }else{
    deferred.resolve(null);
  }
  return deferred.promise;
}

async function find_or_create(url){
  let result = FAIL;

  if (url){
    try{
        const query = await Url.findOrCreate({attributes:['url','id'],
                        where:{url:url}});
        result = {original_url:query[0].dataValues.url,short_url:query[0].dataValues.id};
      } catch (query){
        //return FAIL ;
        console.log(query);
    }
  }
    return result;
  
}

async function find(id){
  let result=FAIL;

  if(id){
    var deferred = Q.defer();
    await Url.findAll({attributes:['url','id'],
                        where:{id:id}})
              .then((query)=>{
                const data={original_url:query[0].dataValues.url,short_url:query[0].dataValues.id};
                //return deferred.resolve(data);})
                deferred.resolve(data);})
              .catch((error)=>{console.log('erro no catch ', error); /*return deferred.resolve(FAIL);*/ deferred.resolve(FAIL);});

              result = deferred.promise;
  }

    return result;

}

async function short_url(url){
  var deferred = Q.defer();
  var lookupPromise = check_url(url);

  lookupPromise.catch(response=>console.log(response))
                  .then((response)=>{
                        find_or_create(response).then((response)=>{ deferred.resolve(response);});
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

