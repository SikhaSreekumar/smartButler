const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    staffid:{
        type:String,
        required:true
    },
    staffname:{
        type:String,
        required:true
    },
    staffpass:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('staffregister',userschema) 