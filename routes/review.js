const express = require("express")
const router= express.Router({mergeParams : true});

const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");

const validateReview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
  if(result.error){
    throw new ExpressError(400,result.error);
  }
  next();
}

//Reviews Posting
router.post("/", validateReview, wrapAsync (async(req,res,next)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  if(!listing){
    throw new ExpressError(404, "Listing Not Found");
  }
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review has been created!")
  res.redirect("/listings/"+id);
}));
//review delete
router.delete("/:reviewId",wrapAsync( async (req,res)=>{
  let {id, reviewId}= req.params;
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}})
  req.flash("success", "Review has been deleted!")
  res.redirect("/listings/"+id);
}));

module.exports = router;