const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'rootroot', 
  database: 'moviesmvp',
})
exports.saveMovie = (movie, cb) => {
  db.query(`INSERT INTO favorites(id, title, poster, description, vote) VALUES(?, ?, ?, ?, ?)`, [])
};

exports.deleteMovie = (movie, cb) => {

};

exports.showFavorites = (cb) => {

}