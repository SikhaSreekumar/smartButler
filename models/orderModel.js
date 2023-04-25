const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    dish_id:{
        type:String,
        required:true
    },
    dishname:{
        type:String,
        required:true
    },
    dishprice:{
        type:String,
        required:true
    },
    newPrize:{
        type:String,
        required:true
    },
    qty:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    Time:{
        type:String,
        required:true,
    },
    Table:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('orderModel',userschema) 