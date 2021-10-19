//env
require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Database

const database =require("./database/databse");

//models

const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication")

//initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//connecting mongoose
// 
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('connection established'));






/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/",async(req,res) => {
    const getAllBooks =await BookModel.find();
    return res.json(getAllBooks);
  });

  /*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",async(req,res) => {
const getSpecificBook = await BookModel.findOne({ISBN :req.params.isbn})

  if(!getSpecificBook) {
    return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book: getSpecificBook});
});


  

  /*
Route            /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/

booky.get("/c/:category", async(req,res) => {
  const getSpecificBook = await BookModel.findOne({category :req.params.category})

  if(!getSpecificBook) {
    return res.json({error: `No book found for the category of ${req.params.category}`});
  }

  return res.json({book: getSpecificBook});

  });

  /*-----------------------------------------------------------------*/
  // My Task 
  /* *****************************************************************   */
  
  /*
Route            /l
Description      Get specific book on language
Access           PUBLIC
Parameter        language
Methods          GET
*/

booky.get("/l/:language",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book) => book.language.includes(req.params.language)
  )

  if(getSpecificBook.length === 0) {
    return res.json({error: `No book found for the language of ${req.params.language}`})
  }

  return res.json({book: getSpecificBook});
})



/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/author", async(req,res) => {
  const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
  });
   /*-----------------------------------------------------------------*/
  // My Task 
  /* *****************************************************************   */
 
  /*
Route            /author/book
Description      Get author based on specific id
Access           PUBLIC
Parameter        id
Methods          GET
*/
booky.get("/author/book/:id", (req,res) =>{
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );
  console.log(req.params.id);

  if(getSpecificAuthor.length === 0){
    return res.json({
      error: `No author found for the book of ${req.params.id}`
    });
  }
  return res.json({authors: getSpecificAuthor});

})
  
  /*
  Route            /author/book
  Description      Get all authors based on books
  Access           PUBLIC
  Parameter        isbn
  Methods          GET
  */
  
  booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
      (author) => author.books.includes(req.params.isbn)
    );
  
    if(getSpecificAuthor.length === 0){
      return res.json({
        error: `No author found for the book of ${req.params.isbn}`
      });
    }
    return res.json({authors: getSpecificAuthor});
  });
  
  /*
  Route            /publications
  Description      Get all publications
  Access           PUBLIC
  Parameter        NONE
  Methods          GET
  */
  
  booky.get("/publications",async(req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
  })

   /*
  Route            /publications/books
  Description      Get publication based on book
  Access           PUBLIC
  Parameter        ISBN
  Methods          GET
  */

  booky.get('/publication/:book', (req, res) => {
    const getSpecificPub = database.publication.filter((publication) =>
      publication.books.includes(req.params.book)
    );
  
    if (getSpecificPub.length === 0) {
      return res.json({
        error: `No publications found for the book of ${req.params.book}`,
      });
    }
    return res.json({ publications: getSpecificPub });
  });

  /*-----------------------------------------------------------------*/
  // My Task 
  /* *****************************************************************   */
 
  /*
Route            /publication
Description      to get a specific publication
Access           PUBLIC
Parameter        id
Methods          GET
*/
booky.get("/publications/:id", (req,res) =>{
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.id === parseInt(req.params.id)
  );
  console.log(req.params.id);

  if(getSpecificPublication.length === 0){
    return res.json({
      error: `No author found for the book of ${req.params.id}`
    });
  }
  return res.json({Publications: getSpecificPublication});

})
  
  booky.get("/publications/book/:isbn", (req,res) => {
    const getSpecificPublication = database.publication.filter(
      (publication) => publication.books.includes(req.params.isbn)
    );
  
    if(getSpecificPublication.length === 0){
      return res.json({
        error: `No author found for the book of ${req.params.isbn}`
      });
    }
    return res.json({Publications: getSpecificPublication});
  });
    

//POST

/*
Route            /book/new
Description      Add new books
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post("/book/new",async (req,res) => {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
    books: addNewBook,
    message: "Book was added !!!"
  });
});

/*
Route            /author/new
Description      Add new authors
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post('/author/new', async (req, res) => {
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    author: addNewAuthor,
    message: 'new add'
  });
});

/*
Route            /publication/new
Description      Add new publicaton
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post('/publication/new', (req, res) => {
  const { newPublication } = req.body;
  const addNewPublication = PublicationModel.create(newPublication);
  return res.json({
    Publication: addNewPublication,
    message: 'Publication was added',
  });

});

//***********Put*************** */
/*
Route            /publication/update/book
Description      Update or Add new Publication
Access           PUBLIC
Parameter        isbn
Methods          Put
*/
booky.put("/book/update/:isbn",async (req,res) =>{
  const updateBook =await BookModel.findOneAndUpdate(
    {
    ISBN: req.params.isbn
    },
    {
    title: req.body.bookTitle
    },
    {
    new:true
    }
);
return res.json({
  books:updateBook
});
});
/*********Updating new author**********/
/*
Route            /book/author/update
Description      Update /add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/author/update/:isbn", async(req,res) =>{
  //Update book database
const updatedBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },
  {
    $addToSet: {
      authors: req.body.newAuthor
    }
  },
  {
    new: true
  }
);

  //Update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor
    },
    {
      $addToSet: {
        books: req.params.isbn
      }
    },
    {
      new: true
    }
  );

  return res.json(
    {
      bookss: updatedBook,
      authors: updatedAuthor,
      message: "New author was added"
    }
  );
} );
/*
Route            /publication/update/book
Description      Update /add new publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
  //Update the publication database
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //Update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });

  return res.json(
    {
      books: database.books,
      publications: database.publication,
      message: "Successfully updated publications"
    }
  );
});

/***********Delete*************** */
/*
Route            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          Delete
*/
booky.delete("/book/delete/:isbn",async(req,res) => {
  //whichever boo that doesnot match,send it to updatedbookdatabase array
  // and rest will be filtered out(deleted )

  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
      ISBN: req.params.isbn
    }
  );

  return res.json({
    books: updatedBookDatabase
  });

});
/*
Route            /book/delete/author
Description      Delete an author from book and vice versa
Access           PUBLIC
Parameter        isbn and authorId
Methods          Delete
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
  //update the book database
  database.books.forEach((book)=>{
    if(book.ISBN === req.params.isbn){
      const newAuthorList=book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author= newAuthorList;
      return;
    }
  })
  
  
  //update the author databadse
  database.author.forEach((eachAuthor)=>{
    if(eachAuthor.id === parseInt(req.params.authorId)){
      const newBookList = eachAuthor.books.filter(
        (book)=> book !== req.params.isbn
      );
      eachAuthor.books= newBookList;//new book list me delet ko chod ke baki sari books hai
      return;
    }
  })
  return res.json({
    book:database.books,
    author:database.author,
    messge : "Author was deleted"
  });


})


    
    
    booky.listen(3000,()=>{
        console.log("Server Is running on port 3000");
    });
    