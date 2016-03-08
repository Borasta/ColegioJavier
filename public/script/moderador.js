"use strict";

app.controller('Representantes', function ($scope, $http, $window) {

	$scope.radio = "c";

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

app.controller('Alumnos', function ($scope, $http, $window) {

	$scope.radio = "c";

	$scope.getGraSec = function () {
		$http({
			"method": "GET",
			"url": "/gradossecciones"
		}).success(function (data) {
			$scope.grados = data.grados;
			$scope.secciones = data.secciones;
		}).error(function (e) {
			console.log(e);
		});
	};

	$scope.getGraSec();

	$scope.updateSelect = function () {
		$('.selectUpdate').material_select("update");
	};
});

app.controller('Familias', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Grados', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Secciones', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Cursos', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Notas', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Anio', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Materias', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('DocenteMateria', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Docentes', function ($scope, $http, $window) {

	$scope.radio = "c";

	$scope.crear = function () {
		console.log($scope.create);
		$http({
			"method": "POST",
			"url": "/docentes",
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

	$scope.modificar = function (docente) {
		$http({
			"method": "PUT",
			"url": "/docentes",
			"params": docente
		}).success(function (data) {
			alert("Modificado correctamente");
		}).error(function (e) {});
	};

	$scope.borrar = function (id) {
		$http({
			"method": "DELETE",
			"url": "/docentes",
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

app.controller('Horarios', function ($scope, $http, $window) {

	$scope.radio = "c";
});

app.controller('Dias', function ($scope, $http, $window) {

	$scope.radio = "c";
});