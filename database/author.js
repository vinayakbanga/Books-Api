const mongoose= require("mongoose");

//cerate  book schema
const AuthorSchema= mongoose.Schema(
    {
      id: Number,
      name: String,
      books: [String]
    }
);
//making model
const AuthorModel =mongoose.model("authors",AuthorSchema);

module.exports =AuthorModel;