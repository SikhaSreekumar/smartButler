const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    dishname:{
        type:String,
        required:true
    },
    dishcat:{
        type:String,
        required:true
    },
    dishdes:{
        type:String,
        required:true
    },
    dishprice:{
        type:String,
        required:true
    },
    availability:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('dishlist',userschema) 