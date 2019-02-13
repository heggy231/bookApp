// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
const express = require('express');
const bodyParser = require('body-parser');
// same as in seed.js for server.js we need interactive in our app
const db = require('./models');
// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



// var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
//  goal: get them all book in .json response
app.get('/api/books', (req, res) => {
  // send all books as JSON response
  // first connection of database
  // send all books as JSON response
  //   .find() method gets 2 parameters
  db.Book.find((err, books) => {
    // if err to catch no books are there
    if (err) {
      console.log("Index error: " + err);
      res.sendStatus(500);
    }
    // if books are there: respond with json obj with books argument
    //   send bck to user
    res.json(books);
  });
});

// get one book
//  google "mongoose method find a single resource" > https://mongoosejs.com/docs/queries.html
//  Model.findOne(): https://mongoosejs.com/docs/api.html#model_Model.findOne
//    find one iphone adventures - iphone adventures??
//    Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
//   go to doc https://mongoosejs.com/docs/models.html
//   
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  //  mongoose will give you the '/api/books/:id' :id is clue uuid! default create book :id
  //  db.Book.findOne({ id: req.params.id }, (err, data) => {}); data is place holder.  data could be anything it is regards to Book
  //  _id is the format you use for UUID that mongoose saves it under
  db.Book.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log("this is not the book you are looking for");
    }
    // if we foudn the one book then we return the json obj of data argument
    res.json(data);
  });

});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  var newBook = req.body;
  newBook._id = newBookUUID++;
  books.push(newBook);
  res.json(newBook);
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('books update', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  var updateBookIndex = books.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id)); //params are strings
  });
  console.log('updating book with index', deleteBookIndex);
  var bookToUpdate = books[deleteBookIndex];
  books.splice(updateBookIndex, 1, req.params);
  res.json(req.params);
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  var deleteBookIndex = books.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id)); //params are strings
  });
  console.log('deleting book with index', deleteBookIndex);
  var bookToDelete = books[deleteBookIndex];
  books.splice(deleteBookIndex, 1);
  res.json(bookToDelete);
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
