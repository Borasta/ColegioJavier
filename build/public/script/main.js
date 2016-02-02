let app = angular.module("MyApp", ["ngLoad"]);

app.controller("LoginController", ($scope, $http, $window) => {
	$scope.autentificado = false;
	$scope.nombre = "";

	if( sessionStorage.token !== "null") {
		console.log(sessionStorage.token);
		$http.get(`/auth/login/${sessionStorage.token}`).success( data => {
				$http.defaults.headers.post.Authorization = `Session ${data.token}`;
				$scope.nombre = `${data.nombres.split(" ")[0]} ${data.apellidos[0]}`;
				$scope.autentificado = true;
				console.log(`Success ${data}`);
			}).error( e => {
				$http.defaults.headers.post.Authorization = null;
				sessionStorage.token = null;
				$scope.autentificado = false;
				$scope.nombre = "";
				console.log(`Error`);
				console.log(e);
			}
		);
	}

	$scope.login = () => {
		if( !$scope.data.type ) {
			alert("Seleccione una categoria");
			return null;
		}

		alert("Data enviada");
		$http.post(`/auth/login`, 
				{
					"user": $scope.data.user, 
					"pass": $scope.data.pass,
					"type": $scope.data.type
				}
			).success( data => {
				$http.defaults.headers.post.Authorization = `Session ${data.token}`;
				$scope.nombre = `${data.nombres.split(" ")[0]} ${data.apellidos[0]}`;
				sessionStorage.token = data.token;
				$scope.autentificado = true;
				console.log(data);
			}).error( e => {
				console.log(`Error`);
				console.log(e);
			}
		);
	}

	$scope.logout = () => {
		$scope.autentificado = false;
		$http.defaults.headers.post.Authorization = null;
		$scope.nombre = "";
		sessionStorage.token = null;
		$window.location = "/";
	}

	$scope.private = path => {
		if( sessionStorage.token !== "null") {
			$window.location = `${path}/${sessionStorage.token}`;
		}
		else {
			$scope.logout();
		}
	}
});

app.controller('EstudianteController', ($scope, $http, $window) => {

	$scope.verData = self => {
		console.log("VER DATA")
		if( !self ) {
			$http.post(`/perfil/estudiante/data`)
				.success( data => {
					console.log(data.estudiante.edad);
					data.estudiante.edad = data.estudiante.edad.split(" ")[0];
					switch( data.estudiante.genero ) {
						case "m":
							data.estudiante.genero = "Varon";
							break;
						case "f":
							data.estudiante.genero = "Hembra";
					}

					for( let i = 0; i < data.representantes.length; i++ ) {
						switch( data.representantes[i].genero ) {
							case "m":
								data.representantes[i].genero = "Hombre";
								break;
							case "f":
								data.representantes[i].genero = "Mujer";
						}
					}

					$scope.misDatos = data;
					console.log(data);
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}

	$scope.verNotas = self => {
		if( !self ) {
			$http.post(`/perfil/estudiante/notas`)
				.success( data => {
					$scope.notas = [];
					for( let i = 0; i < data.length; i++ ) {
						let tmp = {
							"materia": data[i].materia,
							"nombre": `${data[i].nombres.split(" ")[0]} ${data[i].apellidos.split(" ")[0]}`,
							"lapso1": data[i].lapso1,
							"lapso2": data[i].lapso2,
							"lapso3": data[i].lapso3,
							"promedio": data[i].promedio,
							"anio": data[i].anio
						};
						$scope.notas.push(tmp);
					}
					console.log(`Success ${data}`);
					console.log($scope.notas);
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}


	$scope.verHorario = self => {
		if( !self ) {
			$http.post(`/perfil/estudiante/horario`)
				.success( data => {

					let semanas = [
						[],	// Lunes 
						[], // Martes
						[], // Mircoles
						[], // Jueves
						[]	// Viernes
					];

					for( let i = 0; i < data.length; i++ ) {
						switch( data[i].dia ) {
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

					let length = 0;
					for (let i = 0; i < semanas.length; i++) {
						let len = semanas[i].length;
						if( len > length )
							length = len;
					};

					$scope.length = new Array(length);

					$scope.semanas = semanas;
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}

	$scope.verGrupos = self => {
		if( !self ) {
			$http.post(`/perfil/estudiante/grupos`)
				.success( data => {
					$scope.grupos = data;
					console.log(data);
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}

});

app.controller('DocenteController', ($scope, $http, $window) => {

	$scope.verData = self => {
		if( !self ) {
			$http.post(`/perfil/docente/data`)
				.success( data => {
					switch( data.genero ) {
						case "m":
							data.genero = "Hombre";
							break;
						case "f":
							data.genero = "Mujer";
					}

					$scope.misDatos = data;
					console.log(data);
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}

	$scope.verHorario = () => {
		
	}

	$scope.verAlumnos = self => {
		if( !self ) {
			$http.post(`/perfil/docente/alumnos`)
				.success( alumnos => {
					$scope.alumnos = alumnos;
					console.log(alumnos);
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}

	$scope.addNotas = () => {
		
	}



});