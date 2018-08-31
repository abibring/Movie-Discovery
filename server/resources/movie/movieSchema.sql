DROP DATABASE IF EXISTS moviesMVP;

CREATE DATABASE moviesMVP;

USE moviesMVP;

CREATE TABLE favorites (
  id INT(50) NOT NULL,
  title VARCHAR(255),
  poster VARCHAR(255),
  description VARCHAR(255),
  vote INT(50),
  PRIMARY KEY(id)
);