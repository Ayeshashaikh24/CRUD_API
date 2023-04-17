const mongoose=require("mongoose")

const productSchme=new mongoose.Schema({
title:String,
price:String,
image:String,
details:String
});



module.exports=mongoose.model("Product",productSchme)