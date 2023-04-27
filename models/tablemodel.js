const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('tablelist',userschema) 