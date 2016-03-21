//Dependency Configuration
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan'); //Logs requests to server
var methodOverride = require('method-override');
var mongoose = require('mongoose'); //models/collections for DB

//Express Setup
var app = express();

//MongoDB Setup
mongoose.connect("mongodb://localhost/todos");

//Schema Setup
var Todo = mongoose.model('Todo', {
	text : String
});

//Middleware Setup
app.use(express.static(__dirname + '/public' ));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(methodOverride());

// Data Setup
var globalId = 3;
var todos = [{
	"id":0,
	"text": "Need to do nothing"
},{
	"id":1,
	"text": "Need to do one thing"
},{
	"id":2,
	"text": "Need to do two things"
}];

// Routes -- Endpoints
//'/api/todos/:todo_id'       --- Deletes
//req.params.todo_id		  --- Deletes
//Loop through array for matching ID

app.get('/api/todos', function(req, res){
 	Todo.find(function(err, todos){
 		if(err) res.send(err);

 		res.json(todos);
 	});
});

app.post('/api/todos', function(req, res) {

	Todo.create({
		text: req.body.text
	}, function(err, todo) {
		if (err) res.send(err);

		Todo.find(function(err, todos){
 		if(err) res.send(err);

 		res.json(todos);
 		});
	});
});

/// "/api/todos/: --> ":" means looking for user input param
app.put('/api/todos/:todo_id', function( req, res) {

	Todo.update({
		_id: req.params.todo_id
	},{
		text: req.body.text
	}, function(err, todo) {
		if (err) res.send(err);

		Todo.find(function(err, todos){
 		if(err) res.send(err);

 		res.json(todos);
 		});
	});
});

app.delete('/api/todos/:todo_id', function( req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err) res.send(err);

		Todo.find(function(err, todos){
 		if(err) res.send(err);

 		res.json(todos);
 		});
	});
	
});

app.listen(3000); 
console.log("Up and Running on Port 3000");


