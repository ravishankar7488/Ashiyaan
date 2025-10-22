const express = require("express")
const router= express.Router();

const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");

//Validate listing for server side validation
const validateListing=(req,res,next)=>{
    let result=listingSchema.validate(req.body);
  if(result.error){
    throw new ExpressError(400,result.error);
  }
  next();
}

//show listings route
router.get("/", (req,res)=>{
  Listing.find({}).then((result)=>{res.render("./listings/index.ejs", {result})}).catch((error)=>{res.send(error)})
});

//add new list
router.get("/new", isLoggedIn, (req,res)=>{
  res.render("listings/new.ejs")
});
router.post("/",validateListing,isLoggedIn, wrapAsync (async (req, res, next)=>{
  
  let {title, description, price, location, country, url}=req.body;
  let sampleDoc=new Listing({
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
    image:{ filename: 'listingimage',
      url: url}
  });

  await sampleDoc.save();
  req.flash("success", "New Listing Created")
  res.redirect("/listings");
}))

//update route
router.get("/edit/:id",isLoggedIn, wrapAsync( async(req,res)=>{
  let {id}=req.params;
  let result;
  try{
    result= await Listing.findById(id)
  }catch(err){
    throw new ExpressError(500, "Invalid Listing Id");
  }
    if(!result){
      req.flash("error", "Listing You are requested for doesn't exists!")
      res.redirect("/listings");
      return;
    }
    res.render("./listings/edit.ejs", {result});
  }))

router.patch("/edit/:id" ,validateListing,isLoggedIn, wrapAsync(async (req,res, next)=>{
  let {id}=req.params;
  let {title,description,price,url,location,country}=req.body;

  await Listing.findByIdAndUpdate(id, {title: title, description: description, price: price, image:{url: url},location: location, country: country });
  req.flash("success", "Listing has been updated!")
  res.redirect("/listings/"+id)
}));

//show each list route
router.get("/:id", wrapAsync (async(req,res)=>{
  let {id}=req.params;
  let result=await Listing.findById(id).populate("reviews");
  if(!result){
    // throw new ExpressError(404, "Listing Not Found");
    req.flash("error", "Listing you requested for doesn't exist")
    res.redirect("/listings")
    return;
  }

  res.render("./listings/show.ejs", {result})
}));

//delete route
router.delete("/:id", isLoggedIn,(req,res)=>{
  let {id}=req.params;
  Listing.findByIdAndDelete(id).then((result)=>{console.log(result); 
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings")}).catch((error)=>{console.log(error);});
})


module.exports = router;