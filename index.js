const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), //Import build in node modules fs and path
  path = require('path');

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

//Top movies list
let topMovies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994',
  },
  {
    title: 'The Godfather',
    year: '1972',
  },
  {
    title: 'The Dark Knight',
    year: '2008',
  },
  {
    title: "The Godfather Part II",
    year: '1974',
  },
  {
    title: '12 Angry Men',
    year: '1957',
  },
  {
    title: 'Schindlers List',
    year: '1993',
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: '2003',
  },
  {
    title: 'Pulp Fiction',
    year: '1994',
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: '2001',
  },
  {
    title: 'The Good, the Bad and the Ugly',
    year: '1966',
  },
];

//GET requests
app.get('/', (req, res) => {
  res.send('Welcome to the Movies API');
});

//Specifying root: __dirname with express.static instead of url and fs
app.get('/documentation', (req, res) => {
    res.sendFile('/public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies)
});

//Middleware functions
app.use(morgan('combined', {stream: accessLogStream})); //Logger set up

app.use(express.static('public')); //Automatically route all request for static files to public folder

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops, Something went wrong!');
});

//Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
