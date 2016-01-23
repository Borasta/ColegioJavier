var Datos = function () {
    var _representante;
	var _estudiante;
	var _familia;
	var _usuario;

	this.getRepresentante = function () { return _representante; };
	this.setRepresentante = function (representante) {
		_representante = representante;
	};

	this.getEstudiante = function () { return _estudiante; };
	this.setEstudiante = function (estudiante) {
		_estudiante = estudiante;
	};

	this.getFamilia = function () { return _familia; };
	this.setFamilia = function (familia) {
		_familia = familia;
	};

	this.getUsuario = function () { return _usuario; };
	this.setUsuario = function (usuario) {
		_usuario = usuario;
	};

	this.validacion = function () {
        return true;
    };

	this.toJSON = function () {
		return {
			representante: this.getRepresentante(),
			estudiante: this.getEstudiante(),
			familia: this.getFamilia(),
			usuario: this.getUsuario()
		};
	}
};

var Representante = function() {
	var _nombres_r;
    var _apellidos_r;
    var _genero_r;
	var _cedula_r;

	this.getNombres = function() { return _nombres_r; };
	this.setNombres = function( nombres_r ) {
		_nombres_r = nombres_r;
	};

	this.getApellidos = function() { return _apellidos_r; };
	this.setApellidos = function( apellidos_r ) {
		_apellidos_r = apellidos_r;
	};

    this.getGenero = function() { return _genero_r; };
    this.setGenero = function( genero_r ) {
        _genero_r = genero_r;
    };

    this.getCedula = function() { return _cedula_r; };
    this.setCedula = function( cedula_r ) {
        _cedula_r = cedula_r;
    };

	this.validacion = function() {
		return true;
	};

	this.toJSON = function() {
		return {
            nombres_r: this.getNombres(),
            apellido_r: this.getApellidos(),
            genero_r: this.getGenero(),
			cedula_r: this.getCedula()
		};
	}
};

var Estudiante = function() {
	var _nombres_e;
	var _apellido_e;
	var _fecha_nacimiento_e;
	var _cedula_e;
    var _genero_e;

    this.getNombres = function () { return  _nombres_e; };
	this.setNombres = function ( nombres_e ) {
		 _nombres_e = nombres_e;
	};

	this.getApellidos = function () { return _apellido_e; };
	this.setApellidos = function ( apellido_e ) {
		_apellido_e = apellido_e;
	};

	this.getFechaNacimiento = function () { return _fecha_nacimiento_e; };
	this.setFechaNacimiento = function ( fecha_nacimiento_e ) {
		_fecha_nacimiento_e = fecha_nacimiento_e;
	};

	this.getCedula = function () { return _cedula_e; };
	this.setCedula = function ( cedula_e ) {
		_cedula_e = cedula_e;
	};

    this.getGenero = function () { return _genero_e; };
	this.setGenero = function ( genero_e ) {
		_genero_e = genero_e;
	};

	this.validacion = function() {
		return true;
	};

	this.toJSON = function() {
		return {
            nombres_e: this.getNombres(),
            apellido_e: this.getApellidos(),
			fecha_nacimiento_e: this.getFechaNacimiento(),
			cedula_e: this.getCedula()
		};
	}
};

var Familia = function() {
	var _cedula_r;
	var _cedula_e;
	var _direccion;

	this.getCedulaR = function() { return _cedula_r; };
	this.setCedulaR = function( cedula_r ) {
		_cedula_r = cedula_r;
	};

	this.getCedulaE = function() { return _cedula_e; };
	this.setCedulaE = function( cedula_e ) { 
		_cedula_e = cedula_e;
	};

	this.getDireccion = function() { return _direccion; };
	this.setDireccion = function( direccion ) { 
		_direccion = direccion;
	};


	this.validacion = function() {
		return true;
	};

	this.toJSON = function() {
		return {
			cedula_r: this.getCedulaR(),
			cedula_e: this.getCedulaE(),
			direccion: this.getDireccion()
		};
	}
};

var Usuario = function() {
	var _usuario;
	var _contrasenia;

	this.getUsuario = function() { return _usuario; };
	this.setUsuario = function( usuario ) {
		_usuario = usuario;
	};

	this.getContrasenia = function() { return _contrasenia; };
	this.setContrasenia = function( contrasenia ) {
		_contrasenia = contrasenia;
	};

	this.validacion = function() {
		return true;
	};

	this.toJSON = function() {
        return {
            usuario: this.getUsuario(),
            contrasenia: this.getContrasenia()
        }
    };
};