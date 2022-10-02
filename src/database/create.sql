#--Main database
CREATE DATABASE `Safar`;

#--Stores user information
CREATE TABLE `Safar`.`User` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50),
    `Username` VARCHAR(50),
    `Password` VARCHAR(50),
    `Email` VARCHAR(50),
    `Gender` VARCHAR(50),
    `State` VARCHAR(150),
    `Photo` VARCHAR(150),
    PRIMARY KEY(`ID`)
) ENGINE = MyISAM;


#--Stores city's popular place
CREATE TABLE `Safar`.`Place` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),
    `Description` VARCHAR(500),
    `City` VARCHAR(50),
    `State` VARCHAR(50),
    `Coordinate` VARCHAR(150),
    PRIMARY KEY(`ID`)
) ENGINE = MyISAM;


#--Stores place's photo
CREATE TABLE `Safar`.`PlacePhoto` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `PlaceID` BIGINT, #--Reference to place's id
    `UserID` BIGINT, #--Reference to user's id
    `Path` VARCHAR(500),
    `Date` VARCHAR(50),
    PRIMARY KEY(`ID`)
) ENGINE = MyISAM;


#--Stores place's review
CREATE TABLE `Safar`.`PlaceReview` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `PlaceID` BIGINT, #--Reference to place's id
    `UserID` BIGINT, #--Reference to user's id
    `Rating` INT,
    `Date` VARCHAR(50),
    `Description` VARCHAR(500),
    PRIMARY KEY(`ID`)
) ENGINE = MyISAM;


#--Admin Data
INSERT INTO `Safar`.`User` (`Name`, `Username`, `Password`, `State`, `Photo`)VALUES('admin', 'safar_admin', 'safar_admin', '', '/upload/image/admin.jpg');