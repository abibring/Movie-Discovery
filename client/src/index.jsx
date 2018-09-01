import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Movies from './components/Movies.jsx';
import Delete from './components/Delete.jsx';
import Options from './components/Options.jsx';
// import axios from './components/axios.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showFaves: false, favoriteMovies: [], currentMovies: [], moviesByGenre: [] };
    this.getLatest = this.getLatest.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getMoviesByGenre = this.getMoviesByGenre.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    // this.updateOptions = this.updateOptions.bind(this);
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
    axios
      .get('/genres', { params: { genre: e.target.value } })
      .then(({ data }) => {
        this.setState({ currentMovies: data });
      })
      .catch(err => console.error(`err in getMoviesByGenre: ${err}`));
  }

  getFavorites() {
    axios
      .get('faves')
      .then(({ data }) => {
        // console.log(`DATA IN AXIOS.GET: ${JSON.stringify(data)}`);
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
        alert(`Mazal Tov! ${movie.title} has been saved to your favorites!`);
      })
      .catch(err => console.error(`err in saveFavorite: ${err}`));
  }

  getMoviesByGenre(e) {
    axios
      .get('/genres', { params: { genre: e.target.value } })
      .then(({ data }) => {
        console.log(data);
        this.setState({ currentMovies: data });
        // this.props.moviesByGenre.push(data);
      })
      .catch(err => console.error(`err in getMoviesByGenre: ${err}`));
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
            this.getFavorites(); }} >
          {this.state.showFaves ? 'Show Movies' : 'Show Favorites'}
        </button>
        <select onChange={this.getMoviesByGenre}>{options}</select>
        {/* <Options update={this.getMoviesByGenre}/> */}
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
