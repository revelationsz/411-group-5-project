CREATE DATABASE IF NOT EXISTS songapp;
USE songapp;
DROP TABLE IF EXISTS Is_In CASCADE;
DROP TABLE IF EXISTS Comments_Leaves_Has CASCADE;
DROP TABLE IF EXISTS Songlist_Belongs CASCADE;
DROP TABLE IF EXISTS Song CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
    uid int4  AUTO_INCREMENT,
    email varchar(255) UNIQUE,
    first_name CHAR(50),
	last_name CHAR(50),
    user_name CHAR(50),
	hometown CHAR(50),
	gender CHAR(10),
    password varchar(255),
    DOB DATE,
    spotify_username CHAR(50),
    current_emotion CHAR(50),
    CONSTRAINT users_pk PRIMARY KEY (uid) );

CREATE TABLE Song (
	sid int4 AUTO_INCREMENT,
	song_name CHAR(100),
    singer_name CHAR(50),
    original_singer_name CHAR(50),
    composer_name CHAR(50),
    CONSTRAINT song_pk PRIMARY KEY (sid) );
    
CREATE TABLE Songlist_Belongs(
	lid int4 AUTO_INCREMENT,
    uid int4 NOT NULL,
    songlist_name CHAR(200),
    emotion CHAR(200),
	descriptions TEXT,
    PRIMARY KEY (lid,uid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
);

CREATE TABLE Comments_Leaves_Has (
	cid int4 auto_increment,
	comment TEXT,
	date DATETIME,
	uid int4 NOT NULL,
	lid int4 NOT NULL,
	PRIMARY KEY (cid),
	FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE NO ACTION,
	FOREIGN KEY (lid) REFERENCES Songlist_Belongs(lid) ON DELETE CASCADE
);

CREATE TABLE Is_In(
	sid int4 NOT NULL,
    lid int4 NOT NULL,
	PRIMARY KEY (sid,lid),
    FOREIGN KEY (sid) REFERENCES Song(sid) ON DELETE CASCADE,
	FOREIGN KEY (lid) REFERENCES Songlist_Belongs(lid) ON DELETE CASCADE
);



use songapp;
INSERT INTO Users (email,user_name, password) VALUES ('zcchen@bu.edu', 'zcchen',123456);

