CREATE DATABASE IF NOT EXISTS songapp;
USE songapp;
DROP TABLE IF EXISTS Emotion_has CASCADE;
DROP TABLE IF EXISTS Users CASCADE;



CREATE TABLE Users (
    uid int4  AUTO_INCREMENT,
    email varchar(255) UNIQUE,
	emotion int ,
    CONSTRAINT users_pk PRIMARY KEY (uid) );


    


use songapp;
INSERT INTO Users (email) VALUES ('rhinoam@gmail.com');
