const mongoose=require('mongoose');
const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

const Director = require('../models/Directors');
const movies = require('../models/movies');


router.post('/add',(req,res)=>{ 
 const director=new Director(req.body);
 director.save((err,data)=>{
res.json(data);
});

});

router.get('/getAll',(req,res)=>{
const promise= Director.aggregate([
{
    $lookup:{
     from:'movies',
     localField:'_id',
     foreignField:'director_id',
     as:'movie',
    }
},
{
    $unwind:{
       path:'$movie',
       preserveNullAndEmptyArrays:true
    }
},

]);
promise.then((data)=>{
res.json(data);
}).catch((err)=>{
    res.json(err);
});

});

// getting one director's detail
router.get('/:directorId',(req,res)=>{
    const promise= Director.aggregate([
    {
      $match:{
            '_id': mongoose.Types.ObjectId(req.params.directorId)
      }
    },  
 
    {
        $lookup:{
         from:'movies',
         localField:'_id',
         foreignField:'director_id',
         as:'movie',
        }
    },
    {
        $unwind:{
           path:'$movie',
           preserveNullAndEmptyArrays:true
        }
    },
    
    ]);
    promise.then((data)=>{
    res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
    
    });

   //update one director
   router.put('/:director_id',(req,res)=>{
     const promise = Director.findOneAndUpdate(req.params.director_id,req.body);   
     promise.then((data)=>{
       res.json(data);
     }).catch((err)=>{
        res.json(err);
     });

    });
    router.delete('/:director_id',(req,res)=>{
        const promise = Director.findByIdAndRemove(req.params.director_id,req.body);   
        promise.then((data)=>{
          res.json(data);
        }).catch((err)=>{
           res.json(err);
        });
   
       });
   



module.exports=router;