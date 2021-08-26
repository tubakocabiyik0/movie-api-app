const express = require('express');
const router = express.Router();

const Movie= require('../models/movies');



router.post('/add',(req,res)=>{
const {title,category,country,year,imdb_score,} = req.body;

const movies = new Movie({
 title:title,
 category: category,
 country:country,
 year:year,
 imdb_score:imdb_score,
});

movies.save((err,data)=>{
if(err){
  res.json(err);
}
res.json(data);
});
});

router.get('/', function(req, res, next) {
  
});

module.exports = router;
