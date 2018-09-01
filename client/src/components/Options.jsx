import React from 'react';
import axios from 'axios';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentMovies: [] };
    this.getGenres = this.getGenres.bind(this);
    // this.getMoviesByGenre = this.getMoviesByGenre.bind(this);
  }
  componentDidMount() {
    this.getGenres();
  }
  getGenres() {
    axios
      .get('/genre')
      .then(({ data }) => {
        this.setState({ currentMovies: data.genres });
      })
      .catch(err => console.error(`err in genre in index.jsx: ${err}`));
  }

  // getMoviesByGenre(e) {
  //   axios
  //     .get('/genres', { params: { genre: e.target.value } })
  //     .then(({ data }) => {
  //       this.setState({ currentMovies: data });
  //       // this.props.moviesByGenre.push(data);
  //     })
  //     .catch(err => console.error(`err in getMoviesByGenre: ${err}`));
  // }

  render() {
    let options = this.state.currentMovies.map(genre => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      );
    });
    return (
      <select onChange={this.props.getMoviesByGenre}>{options}</select>
    );
  }
};


export default Options;