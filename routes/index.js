const { response } = require('express');
var express = require('express');
const dishmodel = require('../models/dishmodel');
const staffmodel = require('../models/staffmodel');
const usermodel = require('../models/usermodel');
const categorymodel = require('../models/categorymodel');
const orderModel = require('../models/orderModel');
const tablemodel = require('../models/tablemodel');
var router = express.Router();

/* GET home page. */
router.get('/', async(req,res)=>{
res.render('index')
})
router.post('/register', async(req,res)=>{
  console.log(req.body)
  try {
    await usermodel.create(req.body)
    console.log("data inserted")
    console.log(req.body)
  } catch (error) {
    console.log(error)
  }
  res.render('index')
})
router.post('/add-dish', async(req,res)=>{
  console.log(req.body)
  try {
    let img = await dishmodel.create(req.body);
    let { dishimg } = req.files;
    dishimg.mv('./public/images/dishimages/' + img._id + ".jpg").then((err)=>
    {
      if(!err){
        console.log("dish inserted")
        console.log(req.body)
        res.redirect('/adminHome')
      }
    })
  } catch (error) {
    console.log(error)
  }
  
})
router.post('/login', async(req,res)=>{
  console.log(req.body)
  try {
    let user = await usermodel.find({username:req.body.uname,userpass:req.body.upass})
    if(user.length>0){
        console.log("admin loggedin")
        res.redirect('/adminHome')
    }
    let staff = await staffmodel.find({staffname:req.body.uname,staffpass:req.body.upass})
    if(staff.length>0){
          console.log("staff logged in")
          res.redirect('/staffview')
    }
    else{
      res.render('login',{invalid:'Invalid username or password'})
      // res.redirect('/login')
      console.log("no user")
    }
  } catch (error) {
    console.log(error)
  }
})
router.post('/addstaff', async(req,res)=>{
  console.log(req.body)
  try {
    await staffmodel.create(req.body)
    console.log("staff data inserted")
    console.log(req.body)
  } catch (error) {
    console.log(error)
  }
  res.redirect('/adminHome')
})
router.post('/addcategory', async(req,res)=>{
  console.log(req.body)
  try {
    let cat = await categorymodel.create(req.body);
    let { image } = req.files;
    image.mv('./public/images/category/' + cat._id + ".jpg").then((err)=>
    {
      if(!err){
        console.log("category inserted")
        console.log(req.body)
        res.redirect('/getdish')
      }
    })
  } catch (error) {
    console.log(error)
  }
  // res.render('admin/dishdetails')
})
router.post('/addtable', async(req,res)=>{
  console.log(req.body)
  try {
    let cat = await tablemodel.create(req.body);
        console.log("table inserted")
        console.log(req.body)
        res.redirect('/getdish')
      }
   catch (error) {
    console.log(error)
  }
})
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login',(req,res)=>{
  res.render('login')
})
router.get('/addstaff',async(req,res)=>{
    res.redirect('/adminHome')
})
router.get('/adminHome',async(req,res)=>{
  let cata = await categorymodel.find();
  res.render('admin/adminHome',{cata})
})
router.get('/add-dish',async(req,res)=>{
  res.render('admin/adminHome')
})
router.get('/addcategory',(req,res)=>{
  res.render('admin/dishdetails')
})
router.get('/getstaff',async(req,res)=>{
 try {
  let staff=await staffmodel.find()
  console.log(staff)
  res.render("admin/staffdetails",{staff})
 } catch (error) {
  console.log(error)
 } 
})
router.get('/getdish',async(req,res)=>{
  try {
   let dish=await dishmodel.find()
   console.log(dish)
   res.render("admin/dishdetails",{dish})
  } catch (error) {
   console.log(error)
  } 
 })
 router.get('/getorder',async(req,res)=>{
  try{
    let order= await orderModel.find()
    console.log(order)
    res.render("admin/orderupdate",{order})
  }catch(error){
    console.log(error)
  }
 })
 router.get('/getorderlist',async(req,res)=>{
  try{
    let order= await orderModel.find()
    console.log(order)
    res.render("admin/orderlist",{order})
  }catch(error){
    console.log(error)
  }
 })
 router.get('/staffview',async(req,res)=>{
  try {
   let dish=await dishmodel.find()
   console.log(dish)
   res.render("admin/dishupdate",{dish})
  } catch (error) {
   console.log(error)
  } 
 })


router.get('/removestaff/:id',async(req,res)=>{
  let staffid=req.params.id;
  try {
    await staffmodel.findByIdAndDelete({_id:staffid})
    console.log("user removed")
    res.redirect("/getstaff")
  } catch (error) {
    console.log(error)
  }
});
router.get('/removedish/:id',async(req,res)=>{
  let dish_id=req.params.id;
  try {
    await dishmodel.findByIdAndDelete({_id:dish_id})
    console.log("dish removed")
    res.redirect("/getdish")
  } catch (error) {
    console.log(error)
  }
});
router.post('/availupdate/:id',async(req,res)=>{
 let id=req.params.id;
 try{
  let update = await dishmodel.findByIdAndUpdate(id,{ availability:req.body.selectVal },{new:true})
  console.log(update);
  res.redirect('/staffview')
 }
 catch{console.error();}
});
// router.post('/orderupdate/:id',async(req,res)=>{
//   let id = req.params.id;
//   try{
//     let update = await orderModel.findByIdAndUpdate(id,{status:"prepared"},{new:true})
//     console.log(update);
//     res.redirect('/getorder')
//   }
//   catch{console.error();}
// })
router.get('/approve/:id',async(req,res)=>{
  try {
    let id = req.params.id;
        var orders = await orderModel.findByIdAndUpdate({_id:id},{$set :{status:"preparing.."}});
       res.redirect('/getorder')
  } catch (error) {
    console.log(error)
  }
})

router.get('/sentTo/:id',async(req,res)=>{
  try {
    let id = req.params.id;
        var orders = await orderModel.findByIdAndUpdate({_id:id},{$set :{status:"reaching Now.."}});
       res.redirect('/getorder')
  } catch (error) {
    console.log(error)
  }
})
router.get('/orders',async(req,res)=>{
res.render("admin/orders")})
module.exports = router;
