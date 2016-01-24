"use strict";

var app = angular.module("MyApp", []);

app.controller("Login", function ($scope, $http) {
	$scope.login = function () {
		if (!$scope.data.type) {
			alert("Seleccione una categoria");
			return null;
		}

		alert("Data enviada");
		$http.post("/auth/login/" + $scope.data.type, {
			"user": $scope.data.user,
			"pass": $scope.data.pass
		}).success(function (data) {
			$http.defaults.headers.post.Authorization = "Session " + data.token;
			console.log("Success " + data);
			$scope.autentificado = true;
		}).error(function (e) {
			console.log("Error");
			console.log(e);
		});
	};
});