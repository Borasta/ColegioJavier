app.controller('Representantes', ($scope, $http, $window) => {

	$scope.radio = "c";

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

	$scope.verGrados = self => {
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
	};

	$scope.verSecciones = grado => {
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
	};

	$scope.verGrados();
	$scope.verSecciones();

	$scope.updateSelect = () => {
		$('.selectUpdate').material_select("update");
	}

});

app.controller('Familias', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Grados', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Secciones', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Cursos', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Notas', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Anio', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Materias', ($scope, $http, $window) => {
	
	$scope.radio = "c";

	$scope.verMaterias = materias => {
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
	};

	$scope.verMaterias();

});

app.controller('DocenteMateria', ($scope, $http, $window) => {
	
	$scope.radio = "c";

});

app.controller('Docentes', ($scope, $http, $window) => {

	$scope.radio = "c";

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
			console.log(e)
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

});

app.controller('Dias', ($scope, $http, $window) => {
	
	$scope.radio = "c";
	
});