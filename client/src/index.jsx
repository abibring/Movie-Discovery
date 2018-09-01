import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movieId: 4, showFaves: false, favorite: [], current: [], moviesByGenre: [] };
    this.getLatest = this.getLatest.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getByGenre = this.getByGenre.bind(this);
    this.swapFaves = this.swapFaves.bind(this);
    this.save = this.save.bind(this);
    this.getFaves = this.getFaves.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getLatest();
    this.getGenres();
  }

  getGenres() {
    axios.get('/genre')
      .then(({ data }) => {
        this.setState({ moviesByGenre: data.genres });
      })
      .catch(err => console.error(`err in genre in index.jsx: ${err}`));
  }

  getLatest() {
    axios.get('/latest')
      .then(({ data }) => this.setState({ current: data.results }))
      .catch(err => console.error(`err in latest in index.jsx: ${err}`));
  }

  getByGenre(e) {
    axios.get('/genres', { params: { genre: e.target.value } })
      .then(({ data }) => {
        this.setState({ current: data });
      })
      .catch(err => console.error(`err in getByGenre: ${err}`));
  }

  getFaves() {
    axios.get('faves')
      .then(({ data }) => {
        this.setState({ favorite: data });
      })
      .catch(err => console.error(`err in axios.get faves: ${err}`));
  }

  swapFaves() {
    this.setState({ showFaves: !this.state.showFaves });
  }

  save(movie) {
    axios.post('/faves', { movie: movie })
      .then(({ data }) => {
        this.getFaves();
        this.setState({ favorite: [...this.state.favorite, data] });
        alert(`Mazal Tov! ${movie.title} has been saved to your favorites!`);
      })
      .catch(err => console.error(`err in save: ${err}`));
  }

  deleteMovie(movie) {
    // console.log(`MOOOOVIEL ${JSON.stringify(movie)}`)
    axios.delete('/fave', { params: { id: movie.id}})
      .then(() => {
        this.getFaves();
        alert(`${movie.title} has been deleted!`);
      })
      .catch(err => console.error(`err in delete index.jsx: ${err}`));
  }

  render() {
    const options = this.state.moviesByGenre.map(genre => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      );
    });
    return (
      <div>
        <h2>{this.state.showFaves ? 'Check out your favorite movies': 'Find Movies By Genre' }</h2>
        <h6>{this.state.showFaves ? 'Click on movie to delete from your favorites' : 'Click on a movie to save it' }</h6>
        <button onClick={() => {
            this.swapFaves();
            this.getFaves(); }} >
          {this.state.showFaves ? 'Show Movies' : 'Show Favorites'}
        </button>
        <select onChange={this.getByGenre}>{options}</select>
        <Movies
          save={this.save}
          movies={this.state.showFaves ? this.state.favorite : this.state.current}
          remove={this.deleteMovie}
          show={this.state.showFaves}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
