let app = angular.module("MyApp", []);

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
				console.log(`Success ${data}`);
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
	// /perfil/estudiante/notas

	$scope.verData = (self) => {
		if( !self ) {
			console.log($http.defaults.headers.post.Authorization);
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

	$scope.verNotas = (self) => {
		if( !self ) {
			console.log($http.defaults.headers.post.Authorization);
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


	$scope.verHorario = (self) => {
		if( !self ) {
			console.log($http.defaults.headers.post.Authorization);
			$http.post(`/perfil/estudiante/horario`)
				.success( data => {
					for( let i = 0; i < data.length; i++ ) {
						switch( data[i].dia ) {
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
					let horario = [
						[],
						[],
						[],
						[],
						[],
					]
					let anterior = -1;
					let vacio = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
					let semanas = [vacio];
					let length = 0;
					let transpuesta = [
						[,,,,],
						[,,,,],
						[,,,,],
						[,,,,],
						[,,,,],
					];

					console.log(data);

					for( let i = 0; i < data.length; i++ ) {
						horario[data[i].numero].push(data[i]);
						if(horario[data[i].numero].length > length)
							length = horario[data[i].numero].length;
					}

					console.log(length);

					console.log("matriz");
					for( let i = 0; i < data.length; i++ ) {
						transpuesta.push([]);
						for( let j = 0; j < length; j++ ) {
							transpuesta[j].push(horario[j][i]);
						}
					}					


					console.log(transpuesta);
					console.log(horario);
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	}

	$scope.verGrupos = (self) => {
		if( !self ) {
			console.log($http.defaults.headers.post.Authorization);
			$http.post(`/perfil/estudiante/notas`)
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