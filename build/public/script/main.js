let app = angular.module("MyApp", ['ui.materialize']);

app.config(['$httpProvider', function($httpProvider) {
  	$httpProvider.interceptors.push(['$q', function($q) {
    	return {
      		request: function(httpConfig) {
	        	var token = sessionStorage.token;
	        	if( token ) {
	          		httpConfig.headers.Authorization = token;
	        	}
	        	return httpConfig;
      		},
      		responseError: function(response) {
        		return $q.reject(response);
      		}
    	};
  	}]);
}]);

app.controller("LoginController", ($scope, $http, $window) => {
	$scope.autentificado = false;
	$scope.nombre = "";

	if( sessionStorage.token && sessionStorage.nombres && sessionStorage.apellidos ) {
		$scope.nombre = `${sessionStorage.nombres.split(" ")[0]} ${sessionStorage.apellidos[0]}`;
		$scope.autentificado = true;
		$scope.type = sessionStorage.type;
		$scope.flag = sessionStorage.flag;
		console.log(`Success ${sessionStorage.datos}`);
	}
	else {
		sessionStorage.clear();
		$scope.autentificado = false;
		$scope.nombre = "";
	}

	$scope.login = () => {
		if( !$scope.data.type ) {
			alert("Seleccione una categoria");
			return null;
		}

		alert("Data enviada");
		$http.post(`/auth/login/${$scope.data.type}`,
				{
					"user": $scope.data.user, 
					"pass": $scope.data.pass,
					"type": $scope.data.type
				}
			).success( data => {
				$scope.nombre = `${data.nombres.split(" ")[0]} ${data.apellidos[0]}`;
				sessionStorage.token = data.token;
				sessionStorage.nombres = data.nombres;
				sessionStorage.apellidos = data.apellidos;
				sessionStorage.type = data.type;
				sessionStorage.flag = data.flag;
				$scope.autentificado = true;
				console.log(data);
			}).error( e => {
				console.log(`Error`);
				console.log(e);
			}
		);
	};

	$scope.logout = () => {
		$scope.autentificado = false;
		$http.defaults.headers.post.Authorization = null;
		$scope.nombre = "";
		sessionStorage.clear();
		$window.location = "/";
	};

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
		if( !self ) {
			$http.get(`/estudiantes`)
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
	};

	$scope.verNotas = self => {
		if( !self ) {
			$http.get(`/notas`)
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
	};


	$scope.verHorario = self => {
		if( !self ) {
			$http.get(`/horarios`)
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
					}

					$scope.length = new Array(length);

					$scope.semanas = semanas;
				}).error( e => {
					console.log(`Error`);
					console.log(e);
					$scope.logout();
				});
		}
	};

	$scope.verGrupos = self => {
		if( !self ) {
			$http.get(`/grupos`)
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

	$http({
		"method": "GET",
		"url": "/docentes"
	}).success( data => {
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
		// $scope.logout();
	});

	$scope.verGrados = self => {
		if( !self ) {
			$http({
				"url": `/grados`,
				"method": "GET"
			})
				.then(grados => {
					$scope.grados = grados.data;
					console.log($scope.grados);
				}, e => {
					console.log(`Error`);
					console.log(e);
					// $scope.logout();
				});
		}
	};

	$scope.verSecciones = grado => {
		if( !$scope.secciones ) {
			$http({
				"method": "GET",
				"url": `/secciones`,
				"params": {
					"grado": grado
				}
			})
				.then(secciones => {
					$scope.secciones = secciones.data;
					console.log($scope.secciones);
				}, e => {
					console.log(`Error`);
					console.log(e);
					// $scope.logout();
				});
		}
	};

	$scope.verMaterias = id_gra => {
		if( !$scope.materias ) {
			$http({
				"url": `/materias`,
				"method": "GET",
				"params": {
					"id_gra": id_gra
				}
			})
				.then(materias => {
					$scope.materias = materias.data;
					console.log($scope.materias);
				}, e => {
					console.log(`Error`);
					console.log(e);
					// $scope.logout();
				});
		}
	};

	$scope.verEstudiantes = id_m => {
		if( !$scope.estudiantes ) {
			$http({
				"url": `/estudiantes`,
				"method": "GET",
				"params": {
					id_gra: $scope.id_gra,
					id_m: id_m
				}
			})
				.then(estudiantes => {
					$scope.estudiantes = estudiantes.data;
					console.log($scope.estudiantes);
				}, e => {
					console.log(`Error`);
					console.log(e);
					// $scope.logout();
				});
		}
	};

	$scope.verHorario = self => {
		if( !self ) {
			$http.get(`/horarios`)
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
				}

				$scope.length = new Array(length);

				$scope.semanas = semanas;
			}).error( e => {
				console.log(`Error`);
				console.log(e);
				// $scope.logout();
			});
		}
	};

	$scope.subirNota = ( estudiante ) => {
		if( estudiante ) {
			$http({
				"url": `/notas`,
				"method": "POST",
				"data": {
					id_c: estudiante.id_c,
					id_anio: estudiante.id_anio,
					lapso1: estudiante.lapso1,
					lapso2: estudiante.lapso2,
					lapso3: estudiante.lapso3
				}
			})
				.then(resp => {
					console.log(resp);
				}, e => {
					console.log(`Error`);
					console.log(e);
					// $scope.logout();
				});
		}
	};

	$scope.verGrupos = self => {
		if( !self ) {
			$http.get(`/grupos`)
				 .success( data => {
					 $scope.grupos = data;
					 console.log(data);
				 }).error( e => {
				console.log(`Error`);
				console.log(e);
				$scope.logout();
			});
		}
	};

	$scope.watch("gra", function (variable, b, grado){
		$scope.secciones = null;
		$scope.verSecciones(grado);
	});

	$scope.watch("sec", function (variable, b, seccion){
		$scope.materias = null;
		$scope.verMaterias(seccion);
		$scope.id_gra = seccion;
		console.log($scope.id_gra)
	});

	$scope.watch("mat", function (variable, b, materia){
		$scope.estudiantes = null;
		$scope.verEstudiantes(materia);
	})

});