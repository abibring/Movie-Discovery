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
      currentMovies: []
    };
    this.getLatest = this.getLatest.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getMoviesByGenre = this.getMoviesByGenre.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getLatest();
    this.getGenres();
  }

  getGenres() {
    axios
      .get('/genre')
      .then(({ data }) => {
        this.setState({ moviesByGenre: data.genres });
      })
      .catch(err => console.error(`err in genre in index.jsx: ${err}`));
  }

  getLatest() {
    axios
      .get('/latest')
      .then(({ data }) => this.setState({ currentMovies: data.results }))
      .catch(err => console.error(`err in latest in index.jsx: ${err}`));
  }

  getMoviesByGenre(e) {
    let genre = e.target.value;
    axios
      .get('/genres', { params: { genre: genre } })
      .then(({ data }) => {
        this.setState({ currentMovies: data });
      })
      .catch(err => console.error(`err in getMoviesByGenre: ${err}`));
  }

  getFavorites() {
    axios
      .get('faves')
        .then(({ data }) => {
          console.log(`DATA IN AXIOS.GET: ${JSON.stringify(data)}`);
          this.setState({ favoriteMovies: data });
        })
        .catch(err => console.error(`err in axios.get faves: ${err}`));
  }

  swapFavorites() {
    this.setState({ showFaves: !this.state.showFaves });
  }

  saveFavorite(movie) {
    axios
      .post('/faves', { movie: movie })
      .then(({ data }) => {
        this.getFavorites();
        this.setState({ favoriteMovies: [...this.state.favoriteMovies, data] });
        alert('You have saved your movie to the database!');
      })
      .catch(err => console.error(`err in saveFavorite: ${err}`));
  }

  render() {
    let options = this.state.moviesByGenre.map(genre => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      );
    });
    return (
      <div>
        <h1>Alon's MVP</h1>
        <button
          onClick={() => {
            this.swapFavorites();
            this.getFavorites();
          }}
        >
          {this.state.showFaves ? 'Show Movies' : 'Show Favorites'}
        </button>
        <select onChange={this.getMoviesByGenre}>{options}</select>
        <Movies
          faves={this.state.showFaves}
          save={this.saveFavorite}
          movies={
            this.state.showFaves
              ? this.state.favoriteMovies
              : this.state.currentMovies
          }
          show={this.swapFavorites}
          saveFav={this.saveFavorite}
        />
        {/* <Favorites faves={this.state.favoriteMovies} /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
