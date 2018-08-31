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
  }

  componentDidMount() {
    this.getLatest();
    this.getGenres();
  }

  getGenres() {
    axios.get('/genre')
      .then(resp => {
        this.setState({ moviesByGenre: resp.data.genres})
      })
      .catch(err => console.error(`err in genre in index.jsx: ${err}`));
  }

  getLatest() {
    axios.get('/latest')
    .then(resp => this.setState({ currentMovies: resp.data.results }))
    .catch(err => console.error(`err in latest in index.jsx: ${err}`));
  }

  getMoviesByGenre(e) {
    let genre = e.target.value;
    axios.get('/genres', { params: { genre:  genre }})
      .then(({data}) => {
        this.setState({ currentMovies: data })
      })
      .catch(err => console.error(`err in getMoviesByGenre: ${err}`));
  }

  render() {
    let options = this.state.moviesByGenre.map(genre => {
      return (
       <option key={genre.id} value={genre.id}>{genre.name}</option>
      );
    });
    return (
      <div>
       <h1>Hi</h1>
      <select onChange={this.getMoviesByGenre}>
        {options}
      </select>
       <Movies movies={this.state.currentMovies} />
       <Favorites faves={this.state.favoriteMovies} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));