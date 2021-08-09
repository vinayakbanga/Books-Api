const express = require("express");
const bodyParser = require("body-parser")
//Database
const database =require("./databse");

//initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());




/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/",(req,res) => {
    return res.json({books: database.books});
  });

  /*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN ===  req.params.isbn
  );

  if(getSpecificBook.length === 0) {
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

booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
      (book) => book.category.includes(req.params.category)
    )
  
    if(getSpecificBook.length === 0) {
      return res.json({error: `No book found for the category of ${req.params.category}`})
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

booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
  });
   /*-----------------------------------------------------------------*/
  // My Task 
  /* *****************************************************************   */
 
  /*
Route            /author/book
Description      Get all authors
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
  
  booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
  })

   /*
  Route            /publications/books
  Description      Get publication based on book
  Access           PUBLIC
  Parameter        ISBN
  Methods          GET
  */
  /*-----------------------------------------------------------------*/
  // My Task 
  /* *****************************************************************   */
 
  /*
Route            /publication
Description      to get a dpecific publication
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

booky.post("/book/new",(req,res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});

/*
Route            /author/new
Description      Add new authors
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post("/author/new",(req,res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json(database.author);
});

/*
Route            /publication/new
Description      Add new publicaton
Access           PUBLIC
Parameter        NONE
Methods          POST
*/

booky.post("/publication/new",(req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json(database.publication);
});



    
    
    booky.listen(3000,()=>{
        console.log("Server Is running on port 3000");
    });
    