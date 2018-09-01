import React from 'react';
import Grid from '@material-ui/core/Grid';


const Movies = ({ save, movies, remove, show }) => {
  const style = { height: 220, width: 210 };
  const clicked = (movie) => {
    if (show) remove(movie);
    else save(movie)
  }
  return (
    <div className="movies">
     <Grid container justify="center" spacing={20} style={{ padding: 20 }}>
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col" onClick={() => clicked(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster}`}
              style={style}
            />
            <div style={{ fontWeight: 'bold' }}>
              Title: {movie.title}
              <br />
              Vote Average: {movie.vote_average || movie.vote}
            </div>
            <div style={{ width: 200, height: 200 }}>Overview: {movie.overview || movie.description}</div>
          </div>
        );    
      })}
      </Grid>
    </div>
  );
};

export default Movies;
