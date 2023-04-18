const mongoose = require('mongoose');
  
const connect = ()=>{
    return mongoose.connect('mongodb+srv://sik:RMyBj54Sd7YSDMda@cluster0.nnbxeui.mongodb.net/MongoDB?retryWrites=true&w=majority')
}
module.exports = connect;