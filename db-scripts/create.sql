CREATE DATABASE movielistr;

USE movielistr;

CREATE TABLE director (
	id int auto_increment not null primary key,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    birthYear int not null
);

CREATE TABLE movie (
	id int auto_increment not null primary key,
    title varchar(255) not null,
    releaseYear int not null,
    duration int not null,
    rating int not null,
    seen boolean not null,
    directorId int not null,
    FOREIGN KEY (directorId) REFERENCES director(id)
);