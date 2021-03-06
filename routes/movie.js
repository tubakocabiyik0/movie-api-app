const express = require('express');
const router = express.Router();

const Movie= require('../models/movies');


//
router.post('/add',(req,res)=>{
//const {title,category,country,year,imdb_score,} = req.body;

/*const movie = new Movie({
 title:title,
 category: category,
 country:country,
 year:year,
 imdb_score:imdb_score,
});*/
const movie = new Movie(req.body);
movie.save((err,data)=>{
if(err){
  res.json(err);
}
res.json(data);
});
});


//get all movies
router.get('/', function (req, res, next) {
 const promise= Movie.aggregate([
   {
     $lookup:{
     from:'directors',
     localField:'director_id',
     foreignField:'_id',
     as:'director'

     },
   }
 ]);




 promise.then((data)=>{
 res.json(data);
 }).catch((err)=>{
   res.json(err);
 });


});

router.get('/topten',(req,res)=>{
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});
   
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

 });


//get one movie's detail
router.get('/:movieId',(req,res,next)=>{
const promise= Movie.findById(req.params.movieId);

promise.then((data)=>{
if(!data)
 next({message:'This movie not found',code:22});

res.json(data);
}).catch((err) => {
  res.json(err);
});

});

router.put('/:updateById',(req,res)=>{
const promise=Movie.findOneAndUpdate(req.params.updateById,req.body,{new:true});

promise.then((err,data)=>{
  res.json(data);

}).catch((err)=>{
  res.json(err);
});


});

//delete movie
router.delete('/:delete',(req,res)=>{
  const promise = Movie.findByIdAndRemove(req.params.delete);
  
  promise.then((data)=>{
    res.json(data);
  
  }).catch((err)=>{
  res.json(err);
  });
  
  });


 


module.exports = router;
