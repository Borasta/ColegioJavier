"use strict";

app.controller('Representantes', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

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
			console.log(data);
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
	$scope.read = {
		data: ""
	};

	($scope.verGrados = function (self) {
		if (!self) {
			$http({
				"method": "GET",
				"url": "/grados"
			}).then(function (grados) {
				$scope.grados = grados.data;
				console.log($scope.grados);
			}, function (e) {
				console.log("Error");
				console.log(e);
				// $scope.logout();
			});
		}
	})();
	($scope.verSecciones = function (grado) {
		if (!$scope.secciones) {
			$http({
				"method": "GET",
				"url": "/secciones"
			}).then(function (secciones) {
				$scope.secciones = secciones.data;
				console.log($scope.secciones);
			}, function (e) {
				console.log("Error");
				console.log(e);
				// $scope.logout();
			});
		}
	})();

	$scope.leer = function () {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": "/estudiantes",
			"params": $scope.read
		}).success(function (data) {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error(function (e) {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};
});

app.controller('Familias', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};
});

app.controller('Grados', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};
});

app.controller('Secciones', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};
});

app.controller('Cursos', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	$scope.crear = function () {
		$http({
			"method": "POST",
			"url": "/cursos",
			"data": $scope.create
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {
			console.log(e);
		});
	};

	$scope.leer = function () {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": "/cursos",
			"params": $scope.read
		}).success(function (data) {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error(function (e) {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};
});

app.controller('Notas', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};
});

app.controller('Anio', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};
});

app.controller('Materias', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read1 = {
		data: ""
	};
	$scope.read2 = {
		data: ""
	};

	($scope.verMaterias = function (materias) {
		if (!$scope.materias) {
			$http({
				"method": "GET",
				"url": "/materias"
			}).then(function (materias) {
				$scope.materias = materias.data;
				console.log($scope.materias);
			}, function (e) {
				console.log("Error");
				console.log(e);
				// $scope.logout();
			});
		}
	})();

	$scope.crear = function () {
		$http({
			"method": "POST",
			"url": "/materias",
			"data": $scope.create1
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {
			console.log(e);
		});
	};

	$scope.crearDocenteMateria = function () {
		$http({
			"method": "POST",
			"url": "/docente_materia",
			"data": $scope.create2
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {
			console.log(e);
		});
	};

	$scope.leer = function () {
		$scope.dm = false;
		$scope.m = false;
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": "/materias",
			"params": $scope.read1
		}).success(function (data) {
			$scope.m = true;
			console.log(data);
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = true;
		}).error(function (e) {});
	};

	$scope.leerDM = function () {
		$scope.dm = false;
		$scope.m = false;
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": "/docente_materia",
			"params": $scope.read2
		}).success(function (data) {
			$scope.dm = true;
			console.log(data);
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error(function (e) {});
	};
});

app.controller('DocenteMateria', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	$scope.crear = function () {
		$http({
			"method": "POST",
			"url": "/materias",
			"data": $scope.create1
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {
			console.log(e);
		});
	};
});

app.controller('Docentes', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

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
			$scope.result = [];
			$scope.wait = false;
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
	$scope.read = {
		data: ""
	};
});

app.controller('Dias', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};
});

app.controller('Grupos', function ($scope, $http, $window) {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	($scope.verGrupos = function (grupos) {
		if (!$scope.grupos) {
			$http({
				"method": "GET",
				"url": "/grupos"
			}).then(function (grupos) {
				console.log("hla");
				console.log(grupos);
				$scope.grupos = grupos.data;
			}, function (e) {
				console.log("Error");
				console.log(e);
			});
		}
	})();

	$scope.crear = function () {
		console.log($scope.create1);
		$http({
			"method": "POST",
			"url": "/grupos",
			"data": $scope.create
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {});
	};

	$scope.crearMiembro = function () {
		console.log($scope.create1);
		$http({
			"method": "POST",
			"url": "/miembros",
			"data": $scope.create2
		}).success(function (data) {
			$scope.create = null;
			alert("Creado correctamente");
		}).error(function (e) {});
	};

	$scope.crearLider = function () {
		console.log($scope.create1);
		$http({
			"method": "POST",
			"url": "/lideres",
			"data": $scope.create3
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
			"url": "/grupos",
			"params": $scope.read
		}).success(function (data) {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error(function (e) {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};
});