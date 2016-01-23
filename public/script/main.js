var app = angular.module("MyApp", []);

app.controller("Login", function($scope, $http) {
	console.log('hola')
	$http.post("/auth/login/estudiante", {user: "admin", pass: "masterkey" })
	.success(function(data) {
		console.log(data)
	}).error(function(e) {
		console.log(e)
	});
});