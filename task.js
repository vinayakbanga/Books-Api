//Requirement for our project

//We are a book management company

//BOOKS
//ISBN, title, pub date, language, num page, author[], category[]

//AUTHORS
//id, name, books[]

//PUBLICATIONS
//id, name, books[]

//We have to design and code an API over this .

//1. BOOKS
//We need an API :-
//To get all the books - DONE
//To get specific book - DONE
//To get a list of books based on category - DONE
//To get a list of books based on languages - Done

//2. AUTHORS
//We need an API :-
//To get all the authors - DONE
//To get a specific author based on id- Done
//To get a list of authors based on books - DONE

//3. PUBLICATIONS
//We need an API :-
//To get all the publications
//To get a specific publication -DONE
//To get a list of publications based on a book - Done


//POST REQUEST
//1. ADD NEW BOOK - DONE
//2.ADD NEW PUBLICATION -
//3.ADD NEW AUTHOR

/**********PUT***********/
//Update book details if author is changed. - DONE

/*****DELETE****/
//1. Delete a book - DONE
//2. Delete author from book - UR TASK
//3. Delete author from book and related book from author - 
// mongo
//schema is a blue print how the data is constructued
//mongoosee has schema but mongo db not
//mongosee helps in validation,check in relationship with other data
//model- document model of model db
//workflow->schema->model->use