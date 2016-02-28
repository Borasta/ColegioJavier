app.controller('Representantes', ($scope, $http, $window) => {

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
	}

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
	}

	$scope.modificar = ( representante ) => {
		$http({
			"method": "PUT",
			"url": `/representantes`, 
			"params": representante
		}).success( data => {
			alert("Modificado correctamente");
		}).error( e => {
			
		});
	}

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
	
});

app.controller('Familias', ($scope, $http, $window) => {

});

app.controller('Grados', ($scope, $http, $window) => {

});

app.controller('Secciones', ($scope, $http, $window) => {

});

app.controller('Cursos', ($scope, $http, $window) => {
	
});

app.controller('Notas', ($scope, $http, $window) => {
	
});

app.controller('Anio', ($scope, $http, $window) => {
	
});

app.controller('Materias', ($scope, $http, $window) => {
	
});


app.controller('DocenteMateria', ($scope, $http, $window) => {
	
});

app.controller('Docentes', ($scope, $http, $window) => {
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
	}
});

app.controller('Horarios', ($scope, $http, $window) => {
	
});

app.controller('Dias', ($scope, $http, $window) => {
	
});