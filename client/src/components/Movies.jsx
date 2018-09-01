import React from 'react';

const Movies = ({ movies, save, show }) => {
  const style = { height: 220, width: 210 };
  return (
    <div className="container">
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col" onClick={() => save(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster}`}
                style={style}
              />
              <div style={{ fontWeight: 'bold' }}>
                Title: {movie.title}
                <br />
                Vote Average: {movie.vote_average || movie.vote}
              </div>
              <div style={{ flex: 1 }}>Overview: {movie.overview || movie.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
