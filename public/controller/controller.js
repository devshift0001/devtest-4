
 var config = {
      apiKey: "AIzaSyBK90oRzqZmdZ8gfr4RASgrHlo2lYoRgZ4",
      authDomain: "testdbforme.firebaseapp.com",
      databaseURL: "https://testdbforme.firebaseio.com",
      storageBucket: "testdbforme.appspot.com",
      messagingSenderId: "396279320762"
    };
  firebase.initializeApp(config);
var app = angular.module('myApp',[]);
app.controller('mainController', function($scope,$http){
	
$scope.messages=[];
$scope.getMessages= function(id1, id2){
	var ref=firebase.database().ref('conversations/1_2');
	ref.orderByChild('timestamp').on('value', function(snapshot){
		$scope.$apply(function(){
			$scope.messages=[];
			$scope.messages=snapshot.val();
			console.log($scope.messages);
		});
	});

}

$scope.sendMessage=function(){
	console.log("sendMessage");
	//id1, id2, text, timestamp
	var text =$scope.text;
	var newMsgKey = firebase.database().ref('conversations/1_2/').push().key;
	  firebase.database().ref('conversations/1_2/'+newMsgKey).set({
	 	text:text,
	 	timestamp:new Date().getTime(),
	 	userId:1
	 });
	
}

$scope.findContacts=function(){
$http.get('/contactList').success(function(response){
	console.log('i received the data' + JSON.stringify(response));
	$scope.contacts=response;
}, function(error){
	console.log(error);
});
}
// fetch all contacts at init 
$scope.findContacts();
$scope.addContact=function(){
	$http.post("/addContact", $scope.contact).success(function(response){
		console.log(JSON.stringify(response));
	});
	$scope.findContacts();
	$scope.contact='';
}

$scope.deleteContact=function(id){
	console.log(id);
	$http.delete('/deleteContact/'+id).success(function(response){
		console.log(response);
	});
	$scope.findContacts();
}

});
