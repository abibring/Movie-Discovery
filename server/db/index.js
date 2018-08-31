const mysql = require('mysql');
const mySQLConfig = {
  host: 'localhost',
  user: 'root', 
  password: 'rootroot', 
  database: 'alonmvp',
  API_KEY: '3d9aaf2f1fd3a3a7e354ed501c506003',
};

const db = mysql.createConnection(mySQLConfig);

const saveFavorite = (movie, cb) => {
  let { id, title, vote_average, vote_count, poster_path, backdrop_path, release_date } = movie;
  let queryString = 
    `INSERT INTO favorites (id, title, vote_average, vote_count, poster_path, backdrop_path, release_date) VALUES (${id}, '${title}', ${vote_average}, ${vote_count}, '${poster_path}', '${backdrop_path}', '${release_date}');`;
  connection.query(queryString, (err, result) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, result)
    }
  });
}
