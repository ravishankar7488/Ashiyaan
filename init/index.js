const mongoose=require("mongoose")
const initData=require("./data.js")
const Listing=require("../models/listing.js")

main().then(()=>{console.log("connected to wanderlust");}).catch((err)=>{console.log(err);})
async function main(){
  await mongoose.connect("mongodb+srv://pravi5653no0987:Oc6IJ83zpYl2gVyi@cluster0.waryf2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

const initDB= async ()=>{
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("DB initialized");
}

initDB();
