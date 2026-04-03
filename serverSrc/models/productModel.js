const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  img:{
     type:String,
     required:true
  },
  name:{
    type:String,
    required:true
  },  
  color:{
    type:String,
    required:true
  },  
  ram:{
    type:String,
    required:true
  },
  storage:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  }
  
});

module.exports = mongoose.model("Product", productSchema);











