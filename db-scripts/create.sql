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
    director int not null,
    FOREIGN KEY (director) REFERENCES director(id)
);