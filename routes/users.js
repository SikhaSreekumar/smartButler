var express = require('express');
const dishmodel = require('../models/dishmodel');
var router = express.Router();
var categoryModel = require('../models/categorymodel');
const { route } = require('.');
/* GET users listing. */

router.get('/', async(req,res)=>{
  try {
  let dishes =await dishmodel.find()
  let cata =  await categoryModel.find();
  console.log(cata)
  res.render('user/userinterface',{dishes,cata});
} catch (error) {
  console.log(error)
 } 
});

router.get('/dishDetails/:cata', async(req,res)=>{
  console.log(req.params.cata)
  let dishes = await dishmodel.find({dishcat:req.params.cata})
  console.log(dishes)
  res.render('user/dishdisplay',{dishes})
})
router.post('/finishOrder',(req,res)=>{
  console.log(req.body)
  let data = req.body;
  let id = data['array[0][dish_id]']
  let qty = data['array[0][qty]']
  console.log(id);
  var length = Object.keys(data).length;
  console.log(length)
 for(let i =0;i<length;i++){
      console.log(` data['array[${id}][dish_id]']`)
 }
})
module.exports = router;
