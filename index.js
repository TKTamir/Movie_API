const express = require('express'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/MyMoviesDB', { useNewUrlParser: true, useUnifiedTopology: true });


//READ-get- Get all movies
app.get('/movies', (req, res) =>{
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
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


//CREATE-post- Add a new user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
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











