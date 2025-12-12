const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const Review=require("./models/reviews.js");
const method_override=require("method-override");
const path=require("path");
const ejsMate= require("ejs-mate");
// const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema}=require("./schema.js");
// const {reviewSchema}=require("./schema.js");
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

const sessions=require("express-session");
const flash= require("connect-flash")
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.use(method_override("_method"));
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));

main().then(()=>{console.log("connected to wanderlust");}).catch((err)=>{console.log(err);})
async function main(){
  await mongoose.connect("mongodb+srv://pravi5653no0987:Oc6IJ83zpYl2gVyi@cluster0.waryf2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

const sessionOptions={
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 *60 *1000,
    maxAge: 7 * 24 * 60 *60 *1000,
    httpOnly: true,
  },
}

app.get("/", (req,res)=>{
  res.send("Yaha Kya karne aaye ho, is page pe kuchh nahi hai abhi bas testing ke liye hai ye.")
})

app.use(sessions(sessionOptions))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user
  next();
})


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

//error handling middlewares
app.use((req,res,next)=>{
  next(new ExpressError(404, "Page Not Found"))
});

app.use((err, req, res, next)=>{
  let {statusCode=500, message="Something went wrong"}=err;
  res.render("error.ejs", {statusCode, message});
});

app.listen(3000, ()=>{
  console.log("Server listening at 3000")
})
