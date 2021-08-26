const mongoose=require('mongoose');
const schema =mongoose.Schema;

const SchemaMovies= new schema({
    director_id: mongoose.Schema.Types.ObjectId,
    title:{
    type: String,
    required : true
    },

    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
date:{
    type:Date,
    default:Date.now
}

});


module.exports=mongoose.model('movie',SchemaMovies);