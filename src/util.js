const compose = (...functions) => ini => 
    functions.reduceRight((value, func) => func(value), ini);
    
const pipe = (...functions) => ini => 
    functions.reduce((value, func) => func(value), ini);

const log = (req)=>
    console.log(Date().toString(), '\n',req.ip,' ',req.path,' ',req.body.url );

module.exports = {
    compose,
    pipe,
    log
}