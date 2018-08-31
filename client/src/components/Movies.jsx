import React from 'react';

const Movies = ({ movies, show, faves, save, getfaves }) => {
  const style = { height: 220, width: 210 };
  return (
    <div className="container">
      <div className="row">
      <button onClick={() => {
         show();
         getfaves();
         }}>{ faves ? "Show Movies" : "Show Favorites" }</button>
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col" onClick={() => save(movie)}>
              <img
                src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                style={style}
              />
              <div style={{fontWeight: 'bold'}}>
                Title: {movie.title}
                <br />
                Vote Average: {movie.vote_average}
              </div>
              <div style={{ flex: 1}}>
                Overview: {movie.overview}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
