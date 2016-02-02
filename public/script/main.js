"use strict";

var app = angular.module("MyApp", []);

app.controller("LoginController", function ($scope, $http, $window) {
	$scope.autentificado = false;
	$scope.nombre = "";

	if (sessionStorage.token !== "null") {
		console.log(sessionStorage.token);
		$http.get("/auth/login/" + sessionStorage.token).success(function (data) {
			$http.defaults.headers.post.Authorization = "Session " + data.token;
			$scope.nombre = data.nombres.split(" ")[0] + " " + data.apellidos[0];
			$scope.autentificado = true;
			console.log("Success " + data);
		}).error(function (e) {
			$http.defaults.headers.post.Authorization = null;
			sessionStorage.token = null;
			$scope.autentificado = false;
			$scope.nombre = "";
			console.log("Error");
			console.log(e);
		});
	}

	$scope.login = function () {
		if (!$scope.data.type) {
			alert("Seleccione una categoria");
			return null;
		}

		alert("Data enviada");
		$http.post("/auth/login", {
			"user": $scope.data.user,
			"pass": $scope.data.pass,
			"type": $scope.data.type
		}).success(function (data) {
			$http.defaults.headers.post.Authorization = "Session " + data.token;
			$scope.nombre = data.nombres.split(" ")[0] + " " + data.apellidos[0];
			sessionStorage.token = data.token;
			$scope.autentificado = true;
			console.log(data);
		}).error(function (e) {
			console.log("Error");
			console.log(e);
		});
	};

	$scope.logout = function () {
		$scope.autentificado = false;
		$http.defaults.headers.post.Authorization = null;
		$scope.nombre = "";
		sessionStorage.token = null;
		$window.location = "/";
	};

	$scope.private = function (path) {
		if (sessionStorage.token !== "null") {
			$window.location = path + "/" + sessionStorage.token;
		} else {
			$scope.logout();
		}
	};
});

app.controller('EstudianteController', function ($scope, $http, $window) {

	$scope.verData = function (self) {
		console.log("VER DATA");
		if (!self) {
			$http.post("/perfil/estudiante/data").success(function (data) {
				console.log(data.estudiante.edad);
				data.estudiante.edad = data.estudiante.edad.split(" ")[0];
				switch (data.estudiante.genero) {
					case "m":
						data.estudiante.genero = "Varon";
						break;
					case "f":
						data.estudiante.genero = "Hembra";
				}

				for (var i = 0; i < data.representantes.length; i++) {
					switch (data.representantes[i].genero) {
						case "m":
							data.representantes[i].genero = "Hombre";
							break;
						case "f":
							data.representantes[i].genero = "Mujer";
					}
				}

				$scope.misDatos = data;
				console.log(data);
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.verNotas = function (self) {
		if (!self) {
			$http.post("/perfil/estudiante/notas").success(function (data) {
				$scope.notas = [];
				for (var i = 0; i < data.length; i++) {
					var tmp = {
						"materia": data[i].materia,
						"nombre": data[i].nombres.split(" ")[0] + " " + data[i].apellidos.split(" ")[0],
						"lapso1": data[i].lapso1,
						"lapso2": data[i].lapso2,
						"lapso3": data[i].lapso3,
						"promedio": data[i].promedio,
						"anio": data[i].anio
					};
					$scope.notas.push(tmp);
				}
				console.log("Success " + data);
				console.log($scope.notas);
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.verHorario = function (self) {
		if (!self) {
			$http.post("/perfil/estudiante/horario").success(function (data) {

				var semanas = [[], // Lunes
				[], // Martes
				[], // Mircoles
				[], // Jueves
				[] // Viernes
				];

				for (var i = 0; i < data.length; i++) {
					switch (data[i].dia) {
						case "Lunes":
							semanas[0].push(data[i]);
							break;
						case "Martes":
							semanas[1].push(data[i]);
							break;
						case "Miercoles":
							semanas[2].push(data[i]);
							break;
						case "Jueves":
							semanas[3].push(data[i]);
							break;
						case "Viernes":
							semanas[4].push(data[i]);
							break;
					}
				}

				var length = 0;
				for (var i = 0; i < semanas.length; i++) {
					var len = semanas[i].length;
					if (len > length) length = len;
				};

				$scope.length = new Array(length);

				$scope.semanas = semanas;
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.verGrupos = function (self) {
		if (!self) {
			$http.post("/perfil/estudiante/grupos").success(function (data) {
				$scope.grupos = data;
				console.log(data);
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};
});

app.controller('DocenteController', function ($scope, $http, $window) {

	$scope.verData = function (self) {
		if (!self) {
			$http.post("/perfil/docente/data").success(function (data) {
				switch (data.genero) {
					case "m":
						data.genero = "Hombre";
						break;
					case "f":
						data.genero = "Mujer";
				}

				$scope.misDatos = data;
				console.log(data);
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.verHorario = function () {};

	$scope.verAlumnos = function (self) {
		if (!self) {
			$http.post("/perfil/docente/alumnos").success(function (alumnos) {
				$scope.alumnos = alumnos;
				console.log(alumnos);
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.addNotas = function () {};
});