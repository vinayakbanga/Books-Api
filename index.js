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


//***********Put*************** */
/*
Route            /publication/update/book
Description      Update or Add new Publication
Access           PUBLIC
Parameter        isbn
Methods          Put
*/

booky.put("/publication/update/book/:isbn",(req,res) =>{
//update the publication database
database.publication.forEach((pub)=>{ //forEach is used when we donot want to return any thing just we want only to update the content
  if(pub.id === req.body.pubId){
    return pub.books.push(req.params.isbn);
        
  }
})     
//update the book Database
     database.books.forEach((book) =>{
       if(book.ISBN === req.params.isbn){
         book.publications = req.body.pubId;
         return;
       }
     })  
     return res.json(
       {
         books: database.books,
         publication: database.publication,
         messge: "Successfully Updated"
       }
     )                


})
/***********Delete*************** */
/*
Route            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          Delete
*/
booky.delete("/book/delete/:isbn",(req,res) => {
  //whichever boo that doesnot match,send it to updatedbookdatabase array
  // and rest will be filtered out(deleted )

  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;
  
  return res.json({books: database.books})

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
    