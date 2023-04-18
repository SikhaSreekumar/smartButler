const { response } = require('express');
var express = require('express');
const dishmodel = require('../models/dishmodel');
const staffmodel = require('../models/staffmodel');
const usermodel = require('../models/usermodel');
const categorymodel = require('../models/categorymodel');
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
})
router.get('/removedish/:id',async(req,res)=>{
  let dish_id=req.params.id;
  try {
    await dishmodel.findByIdAndDelete({_id:dish_id})
    console.log("dish removed")
    res.redirect("/getdish")
  } catch (error) {
    console.log(error)
  }
})
router.get('/availupdate/:id/edit',async(req,res)=>{
  dishmodel.findById(req.params.id,function(err,dishFound){
    if(err){
      console.log(err);
    }else{
      res.render("edit",{dish:dishFound});
    }
  });
});
router.put('/availupdate/:id',function(req,res){
  dishmodel.findByIdAndUpdate(req.params.id, req.body.dish, {new: true},function (err, dishupdated) {
    if(err){
        console.log(err);
    } else{
        res.redirect('/availupdate' + req.params.id);
    }
 });
});
//   let dish_id=req.params.id;
//   let e = document.getElementById("selectVal");
// let value = e.value;
// let text = e.options[e.selectedIndex].text;
//   try {
//     await dishmodel.findByIdAndUpdate(dish_id,{availability:req.body.avail},function(err,docs){
//       if (err){
//           console.log(err)
//       }
//       else{
//           console.log("Updated User : ", docs);
//       }})
//     console.log("availability updated")
//     res.redirect("/staffview")
//   } catch (error) {
//     console.log(error)
//   }
module.exports = router;
