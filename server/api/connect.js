
var mysql      = require('mysql');
var express =require('express');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123456',
	database : 'restaurant'
});

exports.connection = connection;