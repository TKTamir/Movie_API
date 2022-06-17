const express = require('express'),
app = express(),
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

uuid = require('uuid');
morgan = require('morgan');

const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/MyMoviesDB', { useNewUrlParser: true, useUnifiedTopology: true });





//Users
let users = [
  {
    id: 1,
    name: "Jack",
    password:"",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Jill",
    password:"",
    favoriteMovies: ["The Godfather"]
  },
]

//Top movies list 
let movies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    genre:'Drama',
    director:'Frank Darabont',
    imageurl:'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i',
  },
  {
    title: 'The Godfather',
    year: '1972',
    genre:'Crime',
    director:'Francis Ford Coppola',
    imageurl:'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',
  },
  {
    title: 'The Dark Knight',
    year: '2008',
    genre:'Action',
    director:'Christopher Nolan',
    imageurl:'imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i',
  },
  {
    title: 'The Godfather Part II',
    year: '1974',
    genre:'Crime',
    director:'Francis Ford Coppola',
    imageurl:'https://www.imdb.com/title/tt0071562/mediaviewer/rm4159262464/?ref_=tt_ov_i',
  },
  {
    title: '12 Angry Men',
    year: '1957',
    genre:'Crime',
    director:'Sidney Lumet',
    imageurl:'https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i',
  },
  {
    title: 'Schindlers List',
    year: '1993',
    genre:'Biography',
    director:'Steven Spielber',
    imageurl:'https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i',
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: '2003',
    genre:'',
    director:'Peter Jackson',
    imageurl:'https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i',
  },
  {
    title: 'Pulp Fiction',
    year: '1994',
    genre:'Crime',
    director:'Quentin Tarantino',
    imageurl:'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i',
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: '2001',
    genre:'Action',
    director:'Peter Jackson',
    imageurl:'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i',
  },
  {
    title: 'The Good, the Bad and the Ugly',
    year: '1966',
    genre:'Adventure',
    director:'Sergio Leone',
    imageurl:'https://www.imdb.com/title/tt0060196/mediaviewer/rm1383786241/?ref_=tt_ov_i',
  },
];


//READ-get- Get all movies
app.get('/movies', (req, res) =>{
  res.status(200).json(movies);

});


//READ Title-get- Get a movie by title
app.get('/movies/:title', (req , res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found');
  }
});

//READ Genre-get- Get movie genre info
app.get('/movies/genre/:genreName', (req , res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.genre === genreName ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found');
  }
});

//READ Directors-get- Get a movie director
app.get('/movies/directors/:directorName', (req , res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.director === directorName ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found');
  }
});

//CREATE-post- Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
      res.status(400).send('Please enter a valid user name');
  }
});

//CREATE-post- Add movie to user's favorite movies
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('Please enter a valid user name');

  }
})

//UPDATE-put- Update user name
app.put('/users/:id/:name', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
     user.name = updatedUser.name;
     res.status(200).json(user);
  } else {
    res.status(400).send('User not found');
  }
})





//DELETE- delete- Delete a movie from user's favorite movies
app.delete('/users/:id/movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed to user ${id}'s array`);
  } else{
    res.status(400).send('Please enter a valid user name');

  }
});

//DELETE- delete- Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else{
    res.status(400).send('Please enter a valid user name');

  }
});

app.listen(8080, () => console.log("Listening on 8080"));











