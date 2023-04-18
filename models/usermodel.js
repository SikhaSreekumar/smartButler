const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    usermail:{
        type:String,
        required:true
    },
    userpass:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('registerdetails',userschema) 