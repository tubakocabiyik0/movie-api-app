const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const directorsSchema= new Schema({
    name:{
        type:String,
        required: true,
    },
    surname:{
        type:String,
        required: true,
    },
    

});

module.exports=mongoose.Model('director',directorsSchema);