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

	$scope.getGrados = () => {
		$http({
			"method": "GET",
			"url": `/grados`
		}).success( data => {
			$scope.grados = data.grados;
		}).error( e => {
			console.log(e)
		});
	};

	$scope.getSecciones = () => {
		$http({
			"method": "GET",
			"url": `/grados`
		}).success( data => {
			$scope.secciones = data.secciones;
		}).error( e => {
			console.log(e)
		});
	};

	$scope.getGrados();
	$scope.getSecciones();

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