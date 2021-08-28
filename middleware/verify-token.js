const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
const token = req.headers['x-access-token'] || req.body.token || req.query.token

if(token){
jwt.verify(token,req.app.get('apiSecretKey'),(err,decoded)=>{
req.decode=decoded
next();

});


}else{
    res.json({status:false,message:'token not found'});
}

};