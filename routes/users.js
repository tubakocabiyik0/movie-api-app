const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const bycrips = require('bcryptjs');
const User= require('../models/Users');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',(req,res)=>{
const {username,password}=req.body;

bycrips.hash(password,10).then((hash)=>{
    const user = new User({
        username:username,
        password: hash
    });
    const prommise = user.save();
     
    prommise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })

})

 

});

router.get('/auth',(req,res)=>{
 const {username,password} = req.body;
 User.findOne({
  username   
 },
 (err,data)=>{
 if(err){
     throw err;
 }
 
if(!data){
    res.json({ status: false, message: 'usere not found' });
} 
else{
    bycrips.compare(password,data.password).then((result)=>{
      if(result){
          const payload={
              username
          };
          const token = jwt.sign(payload,req.app.get('apiSecretKey'),{
              expiresIn:720
          });
       
          res.json({status:1,token});

      }
    });
}
});
})

module.exports=router;