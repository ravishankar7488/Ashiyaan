const express = require("express")
const router= express.Router()
const User=require("../models/user.js")
const wrapAsync= require("../utils/wrapAsync.js")
const passport = require("passport")

router.get("/signup", (req,res)=>{
  res.render("./users/signup.ejs")
})
router.post("/signup", async(req,res)=>{
  try{
    let {username,email,password}=req.body;
  const newUser = new User({email,username});
  const registeredUser=await User.register(newUser, password)
  req.flash("success", "Welcome To WanderLust" )
  res.redirect("/listings")
  }catch(e){
    req.flash("error", e.message)
    res.redirect("/signup")
  }
})

router.get("/login", (req,res)=>{
  res.render("./users/login.ejs")
})
router.post("/login",passport.authenticate("local", {failureRedirect: '/login', failureFlash:true}), async(req,res)=>{
  req.flash("success", `Welcome Back ${req.body.username}`)
  res.redirect("/listings")
})

router.get("/logout", (req,res)=>{
  req.logout((err)=>{
    if(err){
     return next(err);
    }
    req.flash("success", "Successfully Logged Out");
    res.redirect("/listings")
  })
})

module.exports=router;