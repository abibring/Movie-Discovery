const mysql = require('mysql');
const mySQLConfig = {
  host: 'localhost',
  user: 'root', 
  password: 'rootroot', 
  database: 'moviesMVP',
};

const db = mysql.createConnection(mySQLConfig);

const save = (movie, cb) => {
  // console.log(`MMMMMM: ${JSON.stringify(movie.overview)}`);
  movie.overview = movie.overview.slice(0, 150);
  let { id, title, poster_path, vote_average, overview } = movie;
  db.query(`INSERT INTO favorites(id, title, poster, description, vote) VALUES (${id}, '${title}', '${poster_path}', '${overview}', ${vote_average})`, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, movie);
    }
  });
}

const get = (cb) => {
  db.query(`SELECT * FROM favorites`, (err, data) => {
    if (err) {
      console.error(`err in get: ${err}`);
      cb(err, null);
    } else {
      // console.log(`data in get: ${data}`);
      cb(null, data)
    }
  })
}

const remove = (movie, cb) => {
  db.query(`DELETE FROM favorites WHERE id=${movie.id}`, (err, data) => {
    if (err) {
      console.error(`err in delete db: ${err}`);
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
}

module.exports = { save, get, remove };
