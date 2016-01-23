window.addEventListener("load", function() {

	// Variables Globales
	var fase1;
	var fase2;
	var fase3;

	var boton;
	var evento;

	var representante 	= new Representante();
	var familia 		= new Familia();
	var estudiante 		= new Estudiante();
	var usuario 		= new Usuario();
	var datos 			= new Datos();

	function iniciar() {
		fase1 = document.getElementById("fase1");
		fase2 = document.getElementById("fase2");
		fase3 = document.getElementById("fase3");

		fase1.style.display = "none";
		fase2.style.display = "none";
		fase3.style.display = "none";

		// form.removeChild( document.getElementById("fase2") );
		primeraFase();
	}

	function primeraFase() {
		fase1.style.display = "inline";

		var primer_nombre_r		= document.getElementById("primer_nombre_r");
		var segundo_nombre_r	= document.getElementById("segundo_nombre_r");
		var primer_apellido_r	= document.getElementById("primer_apellido_r");
		var segundo_apellido_r	= document.getElementById("segundo_apellido_r");
		var cedula_r			= document.getElementById("cedula_r");
		var direccion 			= document.getElementById("direccion");


		boton = document.getElementById("boton");

		evento = function() {

			representante.setPrimerNombre( primer_nombre_r.value );
			representante.setSegundoNombre( segundo_nombre_r.value );
			representante.setPrimerApellido( primer_apellido_r.value );
			representante.setSegundoApellido( segundo_apellido_r.value );
			representante.setCedula( cedula_r.value );

			familia.setDireccion( direccion.value );
			familia.setCedulaR( cedula_r.value );

			if( representante.validacion() ) {
				fase1.style.display = "none";
				segundaFase();
			}
		};

		boton.addEventListener("click", evento);

	}

	function segundaFase() {
		fase2.style.display = "inline";

		boton.removeEventListener("click", evento);			

		var primer_nombre_e		= document.getElementById("primer_nombre_e");
		var segundo_nombre_e	= document.getElementById("segundo_nombre_e");
		var primer_apellido_e	= document.getElementById("primer_apellido_e");
		var segundo_apellido_e	= document.getElementById("segundo_apellido_e");
		var fecha_nacimiento_e	= document.getElementById("fecha_nacimiento_e");
		var cedula_e			= document.getElementById("cedula_e");

		boton = document.getElementById("boton");

		evento = function() {
			estudiante.setPrimerNombre( primer_nombre_e.value );
			estudiante.setSegundoNombre( segundo_nombre_e.value );
			estudiante.setPrimerApellido( primer_apellido_e.value );
			estudiante.setSegundoApellido( segundo_apellido_e.value );
			estudiante.setFechaNacimiento( fecha_nacimiento_e.value );
			estudiante.setCedula( cedula_e.value );

			familia.setCedulaE( cedula_e.value );

			if( estudiante.validacion() ) {
				fase2.style.display = "none";
				terceraFase();
			}
		}

		boton.addEventListener("click", evento);

	}

	function terceraFase() {
		fase3.style.display = "inline";

		boton.removeEventListener("click", evento);

		var user				= document.getElementById("user");
		var contrasenia			= document.getElementById("contrasenia");
		var contrasenia2		= document.getElementById("contrasenia2");

		boton = document.getElementById("boton");
		boton.innerHTML = "Enviar"

		evento = function() {
			usuario.getUsuario( user.value );
			usuario.getContrasenia( contrasenia.value == contrasenia2.value ? contrasenia.value : false );

			if( usuario.validacion() ) {
				datos.setRepresentante( representante.toJSON() );
				datos.setEstudiante( estudiante.toJSON() );
				datos.setFamilia( familia.toJSON() );
				datos.setUsuario( usuario.toJSON() );
				console.log( datos.toJSON() );
				enviar( datos.validacion ? datos.toJSON() : false );
			}
		};

		boton.addEventListener("click", evento);

	}

	r = new Representante();
	e = new Estudiante();
	f = new Familia();
	u = new Usuario();
	d = new Datos();

	r.setPrimerNombre( "representante.setPrimerNombre" );
	r.setSegundoNombre( "representante.setSegundoNombre" );
	r.setPrimerApellido( "representante.setPrimerApellido" );
	r.setSegundoApellido( "representante.setSegundoApellido" );
	r.setCedula( "representante.setCedula" );

	e.setPrimerNombre( "estudiante.setPrimerNombre" );
	e.setSegundoNombre( "estudiante.setSegundoNombre" );
	e.setPrimerApellido( "estudiante.setPrimerApellido" );
	e.setSegundoApellido( "estudiante.setSegundoApellido" );
	e.setFechaNacimiento( "estudiante.setFechaNacimiento" );
	e.setCedula( "estudiante.setCedula" );

	f.setDireccion( "familia.setDireccion" );
	f.setCedulaR( "representante.setCedula" );
	f.setCedulaE( "estudiante.setCedula" );

	u.getUsuario( "usuario.getUsuario" );
	u.getContrasenia( "usuario.getContrasenia");

	d.setRepresentante( r.toJSON() );
	d.setEstudiante( e.toJSON() );
	d.setFamilia( f.toJSON() );
	d.setUsuario( u.toJSON() );

	var datos = JSON.stringify( d.toJSON() ); 

	console.log( datos );

	var ajax_request = new XMLHttpRequest();

	ajax_request.open( "POST", "post.php", true );

	ajax_request.send( datos );

	function enviar() {

	}

	iniciar();

});

















