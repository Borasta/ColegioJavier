'use strict';

app.controller('Docentes', function ($scope, $http, $window) {});

app.controller('Alumnos', function ($scope, $http, $window) {});

app.controller('Representantes', function ($scope, $http, $window) {

	$scope.crear = function () {
		console.log($scope.createR);
		$http.post('/representantes/crear', $scope.createR).success(function (data) {
			$scope.createR = null;
			alert("Creado correctamente");
		}).error(function (e) {});
	};

	$scope.leer = function () {
		$scope.resultL = null;
		$http.post('/representantes/leer', $scope.readR).success(function (data) {
			$scope.readR.data = "";
			$scope.resultL = data;
		}).error(function (e) {});
	};

	$scope.modificar = function () {
		$http.post('/representantes/modificar', $scope.updatedR).success(function (data) {
			$scope.updatedR = null;
		}).error(function (e) {});
	};

	$scope.borrar = function () {
		$http.post('/representantes/borrar', $scope.deleteR).success(function (data) {
			$scope.deleteR = null;
		}).error(function (e) {});
	};
});

app.controller('Materias', function ($scope, $http, $window) {});
app.controller('Horarios', function ($scope, $http, $window) {});
app.controller('Cursos', function ($scope, $http, $window) {});