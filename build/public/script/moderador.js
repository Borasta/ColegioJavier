app.controller('Representantes', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	$scope.crear = () => {
		console.log($scope.create);
		$http({
			"method": "POST",
			"url": `/representantes`,
			"data": $scope.create
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {

		});
	};

	$scope.leer = () => {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/representantes`,
			"params": $scope.read
		}).success( data => {
			console.log(data);
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error( e => {

		});
	};

	$scope.modificar = ( representante ) => {
		$http({
			"method": "PUT",
			"url": `/representantes`,
			"params": representante
		}).success( data => {
			alert("Modificado correctamente");
		}).error( e => {

		});
	};

	$scope.borrar = ( id ) => {
		$http({
			"method": "DELETE",
			"url": `/representantes`,
			"params": {
				"id": id
			}
		}).success( data => {
			alert("Borrado correctamente");
			var pos = 0;
			$scope.result.forEach( (value, index) => {
				if( value.id == id )
					pos = index;
			});
			pos > -1 && $scope.result.splice( pos, 1 );
		}).error( e => {

		});
	}

});

app.controller('Alumnos', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	($scope.verGrados = self => {
		if( !self ) {
			$http({
				"method": "GET",
				"url": `/grados`
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
	})();
	($scope.verSecciones = grado => {
		if( !$scope.secciones ) {
			$http({
				"method": "GET",
				"url": `/secciones`
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
	})();

	$scope.leer = () => {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/estudiantes`,
			"params": $scope.read
		}).success( data => {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error( e => {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};

});

app.controller('Familias', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Grados', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Secciones', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Cursos', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	$scope.crear = () => {
		$http({
			"method": "POST",
			"url": `/cursos`,
			"data": $scope.create
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {
			console.log(e)
		});
	};

	$scope.leer = () => {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/cursos`,
			"params": $scope.read
		}).success( data => {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error( e => {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};

});

app.controller('Notas', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Anio', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Materias', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read1 = {
		data: ""
	};
	$scope.read2 = {
		data: ""
	};

	($scope.verMaterias = materias => {
		if( !$scope.materias ) {
			$http({
				"method": "GET",
				"url": `/materias`
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
	})();

	$scope.crear = () => {
		$http({
			"method": "POST",
			"url": `/materias`,
			"data": $scope.create1
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {
			console.log(e)
		});
	};

	$scope.crearDocenteMateria = () => {
		$http({
			"method": "POST",
			"url": `/docente_materia`,
			"data": $scope.create2
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {
			console.log(e)
		});
	};

	$scope.leer = () => {
		$scope.dm = false;
		$scope.m = false;
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/materias`,
			"params": $scope.read1
		}).success( data => {
			$scope.m = true;
			console.log(data);
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = true;
		}).error( e => {

		});
	};

	$scope.leerDM = () => {
		$scope.dm = false;
		$scope.m = false;
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/docente_materia`,
			"params": $scope.read2
		}).success( data => {
			$scope.dm = true;
			console.log(data);
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error( e => {

		});
	};

});

app.controller('DocenteMateria', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	$scope.crear = () => {
		$http({
			"method": "POST",
			"url": `/materias`,
			"data": $scope.create1
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {
			console.log(e)
		});
	};

});

app.controller('Docentes', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	$scope.crear = () => {
		console.log($scope.create);
		$http({
			"method": "POST",
			"url": `/docentes`,
			"data": $scope.create
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {

		});
	};

	$scope.leer = () => {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/docentes`,
			"params": $scope.read
		}).success( data => {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error( e => {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};

	$scope.modificar = ( docente ) => {
		$http({
			"method": "PUT",
			"url": `/docentes`,
			"params": docente
		}).success( data => {
			alert("Modificado correctamente");
		}).error( e => {

		});
	};

	$scope.borrar = ( id ) => {
		$http({
			"method": "DELETE",
			"url": `/docentes`,
			"params": {
				"id": id
			}
		}).success( data => {
			alert("Borrado correctamente");
			var pos = 0;
			$scope.result.forEach( (value, index) => {
				if( value.id == id )
					pos = index;
			});
			pos > -1 && $scope.result.splice( pos, 1 );
		}).error( e => {

		});
	}

});

app.controller('Horarios', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Dias', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

});

app.controller('Grupos', ($scope, $http, $window) => {

	$scope.radio = "c";
	$scope.read = {
		data: ""
	};

	($scope.verGrupos = grupos => {
		if( !$scope.grupos ) {
			$http({
				"method": "GET",
				"url": `/grupos`
			})
				.then(grupos => {
					console.log("hla");
					console.log(grupos);
					$scope.grupos = grupos.data;
				}, e => {
					console.log(`Error`);
					console.log(e);
				});
		}
	})();

	$scope.crear = () => {
		console.log($scope.create1);
		$http({
			"method": "POST",
			"url": `/grupos`,
			"data": $scope.create
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {

		});
	};

	$scope.crearMiembro = () => {
		console.log($scope.create1);
		$http({
			"method": "POST",
			"url": `/miembros`,
			"data": $scope.create2
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {

		});
	};

	$scope.crearLider = () => {
		console.log($scope.create1);
		$http({
			"method": "POST",
			"url": `/lideres`,
			"data": $scope.create3
		}).success( data => {
			$scope.create = null;
			alert("Creado correctamente");
		}).error( e => {

		});
	};

	$scope.leer = () => {
		$scope.result = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/grupos`,
			"params": $scope.read
		}).success( data => {
			$scope.read.data = "";
			$scope.result = data ? data : [];
			$scope.wait = false;
		}).error( e => {
			console.log(e);
			$scope.result = [];
			$scope.wait = false;
		});
	};

});