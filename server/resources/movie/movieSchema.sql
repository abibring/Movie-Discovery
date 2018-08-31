DROP DATABASE IF EXISTS moviesMVP;

CREATE DATABASE moviesMVP;

USE moviesMVP;

CREATE TABLE favorites (
  id INT(20) NOT NULL,
  title VARCHAR(255),
  poster VARCHAR(255),
  description VARCHAR(255),
  vote INT(20),
  PRIMARY KEY(id)
);