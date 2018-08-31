const mysql = require('mysql');
const mySQLConfig = {
  host: 'localhost',
  user: 'root', 
  password: 'rootroot', 
  database: 'moviesMVP',
};

const db = mysql.createConnection(mySQLConfig);

const save = (movie, cb) => {
  console.log(`MMMMMM: ${JSON.stringify(movie)}`)
  let { id, title, poster_path, overview, vote_count } = movie;
  db.query(`INSERT INTO favorites(id, title, poster, description, vote) VALUES (${id}, '${title}', '${poster_path}', '${overview}', ${vote_count})`, (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
}

module.exports = { save };
