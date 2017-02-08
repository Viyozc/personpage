SET NAMES UTF8;
DROP DATABASE IF EXISTS imagewall;
CREATE DATABASE imagewall charset=utf8;

USE imagewall;
CREATE TABLE imgUrl(
iid INT(4) PRIMARY KEY AUTO_INCREMENT,
iurl varchar(50)
);

INSERT INTO imgUrl VALUES(
{NULL,'image01.jpg'},
{NULL,'image02.jpg'},
{NULL,'image03.jpg'},
{NULL,'image04.jpg'},
{NULL,'image05.jpg'},
{NULL,'image06.jpg'},
{NULL,'image07.jpg'},
{NULL,'image08.jpg'},
{NULL,'image09.jpg'},
{NULL,'image010.jpg'},
{NULL,'image011.jpg'},
{NULL,'image012.jpg'}

)
