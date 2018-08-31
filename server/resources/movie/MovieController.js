const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'rootroot', 
  database: 'moviesmvp',
})
exports.saveMovie = () => {

};

exports.deleteMovie = () => {

};

exports.showFavorites = () => {
  
}