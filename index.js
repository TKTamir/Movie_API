const express = require('express'),
  morgan = require('morgan');

const app = express();

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

app.get('documentation', (req, res) =>{
    res.sendFile('public/documentation.html', { root: __dirname});
});

app.get('/movies', (req, res) => {
    res.json(topMovies)
});

//Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
