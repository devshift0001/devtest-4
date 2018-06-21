var express =require('express');
var app =express();
/*var mongo= require('mongojs');
var db = mongo('192.168.2.62/dev', ['contact']);*/
var bodyParser=require('body-parser');
var firebase = require("firebase");
const PORT = process.env.PORT || 5000;
 var config = {
    apiKey: "AIzaSyBK90oRzqZmdZ8gfr4RASgrHlo2lYoRgZ4",
    authDomain: "testdbforme.firebaseapp.com",
    databaseURL: "https://testdbforme.firebaseio.com",
    storageBucket: "testdbforme.appspot.com",
    messagingSenderId: "396279320762"
  };
  firebase.initializeApp(config);
  // Get a reference to the database service
var database = firebase.database();

app.use(express.static(__dirname +"/public"));
app.use(bodyParser.json());

app.get("/getMessage", function(request, response){
	console.log("server getMessage hited..");
	database.ref('conversations/1_2').once('value',function(snapshot){
		console.log(snapshot.val());
		response.json(snapshot.val());
	})
})

app.get('/contactList',function(request, response){
	console.log("server contactList hited..");
	database.ref('/contact/').once('value').then(function(snapshot) {
	  var users = snapshot.val();
	  console.log(users);
	  response.json(users);
	});


});

app.post('/addContact', function(request,response){
	console.log("server addContact hited..");
	//console.log(request.body);
	var data = request.body;
	 var newPostKey = database.ref().child('contact').push().key;
	 database.ref('contact/' + newPostKey).set({
	 	name:data.name,
	 	email:data.email,
	 	number:data.number
	 });
});

app.delete('/deleteContact/:id',function(request,response){
	console.log("server deleteContact hited..");
	console.log(request.params.id);
	database.ref('contact/' + request.params.id).remove();
});

app.listen(PORT);