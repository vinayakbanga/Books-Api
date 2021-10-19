const mongoose = require("mongoose");

//create publication schema
 const BookSchema = mongoose.Schema(
   {
     ISBN: String,
     title: String,
     pubDate: String,
     language: String,
     numPage: Number,
     author: [Number],
     publications: [Number],
     category: [String]
   }
 );
//making model
 const BookModel = mongoose.model("books",BookSchema);

 module.exports = BookModel;