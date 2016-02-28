"use strict";

app.controller('Representantes', function ($scope, $http, $window) {

	$scope.crear = function () {
		console.log($scope.create);
		$http({
			"method": "POST",
			"url": "/representantes",
			"data": $scope.create
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {});
	};

	$scope.leer = function () {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": "/representantes",
			"params": $scope.read
		}).success(function (data) {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error(function (e) {});
	};

	$scope.modificar = function (representante) {
		$http({
			"method": "PUT",
			"url": "/representantes",
			"params": representante
		}).success(function (data) {
			alert("Modificado correctamente");
		}).error(function (e) {});
	};

	$scope.borrar = function (id) {
		$http({
			"method": "DELETE",
			"url": "/representantes",
			"params": {
				"id": id
			}
		}).success(function (data) {
			alert("Borrado correctamente");
			var pos = 0;
			$scope.result.forEach(function (value, index) {
				if (value.id == id) pos = index;
			});
			pos > -1 && $scope.result.splice(pos, 1);
		}).error(function (e) {});
	};
});

app.controller('Alumnos', function ($scope, $http, $window) {});

app.controller('Familias', function ($scope, $http, $window) {});

app.controller('Grados', function ($scope, $http, $window) {});

app.controller('Secciones', function ($scope, $http, $window) {});

app.controller('Cursos', function ($scope, $http, $window) {});

app.controller('Notas', function ($scope, $http, $window) {});

app.controller('Anio', function ($scope, $http, $window) {});

app.controller('Materias', function ($scope, $http, $window) {});

app.controller('DocenteMateria', function ($scope, $http, $window) {});

app.controller('Docentes', function ($scope, $http, $window) {
	$scope.leer = function () {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": "/docentes",
			"params": $scope.read
		}).success(function (data) {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error(function (e) {
			console.log(e);
		});
	};
});

app.controller('Horarios', function ($scope, $http, $window) {});

app.controller('Dias', function ($scope, $http, $window) {});