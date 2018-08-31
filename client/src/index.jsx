import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Movies from './components/Movies.jsx';
import Favorites from './components/Favorites.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: 5,
      showFaves: false,
      favoriteMovies: [],
      moviesByGenre: [],
      similarMovies: [],
      latestMovies: []
    };
    this.getLatest = this.getLatest.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getMoviesByGenre = this.getMoviesByGenre.bind(this);
  }

  componentDidMount() {
    this.getLatest();
    this.getGenres();
  }

  getGenres() {
    axios.get('/genre')
      .then(resp => {
        console.log(`resp in genre in index.jsx: ${JSON.stringify(resp.data.genres)}`);
        this.setState({ moviesByGenre: resp.data.genres})
      })
      .catch(err => console.error(`err in genre in index.jsx: ${err}`));
  }

  getLatest() {
    axios.get('/latest')
    .then(resp => this.setState({ latestMovies: resp.data.results }))
    .catch(err => console.error(`err in latest in index.jsx: ${err}`));
  }

  getMoviesByGenre(e) {
    console.log(`genre: ${e.target.value}`);
    axios.get('/genres', { params: e.target.value})
      .then(results => console.log(`results in getMoviesByGenre: ${results}`))
      .catch(err => console.error(`err in getMoviesByGenre: ${err}`));
  }

  render() {
    let options = this.state.moviesByGenre.map(genre => {
      return (
       <option key={genre.id}>{genre.name}</option>
      );
    });
    return (
      <div>
       <h1>Hi</h1>
      <select onChange={this.getMoviesByGenre}>
        {options}
      </select>
       <Movies movies={this.state.latestMovies} />
       <Favorites faves={this.state.favoriteMovies} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));