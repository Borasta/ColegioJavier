app.controller('Docentes', ($scope, $http, $window) => {
	
});

app.controller('Alumnos', ($scope, $http, $window) => {
	
});

app.controller('Representantes', ($scope, $http, $window) => {

	$scope.crear = () => {
		console.log($scope.createR);
		$http({
			"method": "POST",
			"url": `/representantes`, 
			"data": $scope.createR
		}).success( data => {
			$scope.createR = null;
			alert("Creado correctamente");
		}).error( e => {
			
		});
	}

	$scope.leer = () => {
		$scope.resultL = null;
		$scope.wait = true;
		$http({
			"method": "GET",
			"url": `/representantes`, 
			"params": $scope.readR
		}).success( data => {
			$scope.readR.data = "";
			$scope.resultL = data ? data : [];
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
			$scope.resultL.forEach( (value, index) => {
				if( value.id == id )
					pos = index;
			});
			pos > -1 && $scope.resultL.splice( pos, 1 );
		}).error( e => {
			
		});
	}

});

app.controller('Materias', ($scope, $http, $window) => {
	
});
app.controller('Horarios', ($scope, $http, $window) => {
	
});
app.controller('Cursos', ($scope, $http, $window) => {
	
});