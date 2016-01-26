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
			console.log("Success " + data);
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
	// /perfil/estudiante/notas

	$scope.verData = function (self) {
		if (!self) {
			console.log($http.defaults.headers.post.Authorization);
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
			console.log($http.defaults.headers.post.Authorization);
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
			console.log($http.defaults.headers.post.Authorization);
			$http.post("/perfil/estudiante/horario").success(function (data) {
				for (var i = 0; i < data.length; i++) {
					switch (data[i].dia) {
						case "Lunes":
							data[i].numero = 0;
							break;
						case "Martes":
							data[i].numero = 1;
							break;
						case "Miercoles":
							data[i].numero = 2;
							break;
						case "Jueves":
							data[i].numero = 3;
							break;
						case "Viernes":
							data[i].numero = 4;
							break;
					}
				}
				var horario = [[], [], [], [], []];
				var anterior = -1;
				var vacio = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
				var semanas = [vacio];
				var length = 0;
				var transpuesta = [[,,,,], [,,,,], [,,,,], [,,,,], [,,,,]];

				console.log(data);

				for (var i = 0; i < data.length; i++) {
					horario[data[i].numero].push(data[i]);
					if (horario[data[i].numero].length > length) length = horario[data[i].numero].length;
				}

				console.log(length);

				console.log("matriz");
				for (var i = 0; i < data.length; i++) {
					transpuesta.push([]);
					for (var j = 0; j < length; j++) {
						transpuesta[j].push(horario[j][i]);
					}
				}

				console.log(transpuesta);
				console.log(horario);
			}).error(function (e) {
				console.log("Error");
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.verGrupos = function (self) {
		if (!self) {
			console.log($http.defaults.headers.post.Authorization);
			$http.post("/perfil/estudiante/notas").success(function (data) {
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