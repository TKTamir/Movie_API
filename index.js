const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
uuid = require('uuid');
// morgan = require('morgan'),
// fs = require('fs'), //Import build in node modules fs and path
// path = require('path');


app.use(bodyParser.json());



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


//READ
app.get('/movies', (req, res) =>{
  res.status(200).json(movies);

})


//READ Title
app.get('/movies/:title', (req , res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found')
  }
})

//READ Genre
app.get('/movies/genre/:genreName', (req , res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;// MAYBE REMOVE NAME LATER

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found')
  }
})

//READ Directors
app.get('/movies/directors/:directorName', (req , res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found')
  }
})


app.listen(8080, () => console.log("Listening on 8080"))












// const app = express();
// // create a write stream (in append mode)
// // a ‘log.txt’ file is created in root directory
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

// //Top movies list
// let topMovies = [
//   {
//     title: 'The Shawshank Redemption',
//     year: '1994',
//   },
//   {
//     title: 'The Godfather',
//     year: '1972',
//   },
//   {
//     title: 'The Dark Knight',
//     year: '2008',
//   },
//   {
//     title: 'The Godfather Part II',
//     year: '1974',
//   },
//   {
//     title: '12 Angry Men',
//     year: '1957',
//   },
//   {
//     title: 'Schindlers List',
//     year: '1993',
//   },
//   {
//     title: 'The Lord of the Rings: The Return of the King',
//     year: '2003',
//   },
//   {
//     title: 'Pulp Fiction',
//     year: '1994',
//   },
//   {
//     title: 'The Lord of the Rings: The Fellowship of the Ring',
//     year: '2001',
//   },
//   {
//     title: 'The Good, the Bad and the Ugly',
//     year: '1966',
//   },
// ];

// //GET requests
// app.get('/', (req, res) => {
//   res.send('Welcome to the Movies API');
// });

// //Specifying root: __dirname with express.static instead of url and fs
// app.get('/documentation', (req, res) => {
//   res.sendFile('/public/documentation.html', { root: __dirname });
// });

// app.get('/movies', (req, res) => {
//   res.json(topMovies);
// });

// //Middleware functions
// app.use(morgan('combined', { stream: accessLogStream })); //Logger set up

// app.use(express.static('public')); //Automatically route all request for static files to public folder

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Oops, Something went wrong!');
// });

// //Listen for requests
// app.listen(8080, () => {
//   console.log('Your app is listening on port 8080.');
// });
