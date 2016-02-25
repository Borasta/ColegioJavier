app.controller('Docentes', ($scope, $http, $window) => {
	
});

app.controller('Alumnos', ($scope, $http, $window) => {
	
});

app.controller('Representantes', ($scope, $http, $window) => {
	
	$scope.crear = () => {
		console.log($scope.createR);
		$http.post(`/representantes/crear`, $scope.createR)
		.success( data => {
			$scope.createR = null;
			alert("Creado correctamente");
		}).error( e => {
			
		});
	}

	$scope.leer = () => {
		$scope.resultL = null;
		$http.post(`/representantes/leer`, $scope.readR)
		.success( data => {
			$scope.readR.data = "";
			$scope.resultL = data;
		}).error( e => {
			
		});
	}

	$scope.modificar = () => {
		$http.post(`/representantes/modificar`, $scope.updatedR)
		.success( data => {
			$scope.updatedR = null;

		}).error( e => {
			
		});
	}

	$scope.borrar = () => {
		$http.post(`/representantes/borrar`, $scope.deleteR)
		.success( data => {
			$scope.deleteR = null;

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