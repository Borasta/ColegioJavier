window.addEventListener("load", function() {

	// Variables Globales
	var fase1 = document.getElementById("fase1");
	var fase2 = document.getElementById("fase2");
	var fase3 = document.getElementById("fase3");

	var boton = document.getElementById("boton");
	var evento;

	var representante;
	var familia;
	var estudiante;
	var usuario;
	var datos;

	function iniciar() {
		fase1.style.display = "none";
		fase2.style.display = "none";
		fase3.style.display = "none";

        representante 	= new Representante();
        familia 		= new Familia();
        estudiante 		= new Estudiante();
        usuario 		= new Usuario();
        datos 			= new Datos();

		primeraFase();
	}

	function primeraFase() {
		fase1.style.display = "inline";

        boton.removeEventListener("click", evento);

		var genero_r_m = document.getElementById("genero_r_m");
		var genero_r_f = document.getElementById("genero_r_f");

        genero_r_m.checked = true;

		var nombres_r		= document.getElementById("nombres_r");
		var apellidos_r		= document.getElementById("apellidos_r");
		var cedula_r		= document.getElementById("cedula_r");
		var genero_r		= genero_r_m.checked ? genero_r_m : genero_r_f;
		var direccion 		= document.getElementById("direccion");

		evento = function() {
			representante.setNombres( nombres_r.value );
			representante.setApellidos( apellidos_r.value );
			representante.setGenero( genero_r.value );
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

		var genero_e_m = document.getElementById("genero_e_m");
		var genero_e_f = document.getElementById("genero_e_f");

        genero_e_m.checked = true;

		var nombres_e			= document.getElementById("nombres_e");
		var apellidos_e			= document.getElementById("apellidos_e");
		var fecha_nacimiento_e	= document.getElementById("fecha_nacimiento_e");
		var cedula_e			= document.getElementById("cedula_e");
		var genero_e			= genero_e_m.checked ? genero_e_m : genero_e_f;

		evento = function() {
			estudiante.setNombres( nombres_e.value );
			estudiante.setApellidos( apellidos_e.value );
			estudiante.setFechaNacimiento( fecha_nacimiento_e.value );
			estudiante.setCedula( cedula_e.value );
			estudiante.setGenero( genero_e.value );

			familia.setCedulaE( cedula_e.value );

			if( estudiante.validacion() ) {
				fase2.style.display = "none";
				terceraFase();
			}
		};

		boton.addEventListener("click", evento);

	}

	function terceraFase() {
		fase3.style.display = "inline";

		boton.removeEventListener("click", evento);

		var user				= document.getElementById("user");
		var contrasenia			= document.getElementById("contrasenia");
		var contrasenia2		= document.getElementById("contrasenia2");

		boton.innerHTML = "Enviar";

		evento = function() {
			usuario.setUsuario( user.value );
			usuario.setContrasenia( contrasenia.value == contrasenia2.value ? contrasenia.value : false );

			if( usuario.validacion() ) {
				datos.setRepresentante( representante.toJSON() );
				datos.setEstudiante( estudiante.toJSON() );
				datos.setFamilia( familia.toJSON() );
				datos.setUsuario( usuario.toJSON() );
				enviar( datos.validacion ? datos.toJSON() : false );
			}
		};
		boton.addEventListener("click", evento);
	}

	var r = new Representante();
	var e = new Estudiante();
	var f = new Familia();
	var u = new Usuario();
	var d = new Datos();

	r.setNombres( "Orlando Douglas" );
	r.setApellidos( "Bohorquez Salazar" );
	r.setCedula( "4994585" );
    r.setGenero( "M" );

	e.setNombres( "Orlando David" );
	e.setApellidos( "Bohorquez Garcia" );
	e.setFechaNacimiento( "01/04/19996" );
	e.setCedula( "24730003" );
    e.setGenero( "M" );

	f.setDireccion( "Av 15, Calle 2A Res Fadesa Apt 2B" );
	f.setCedulaR( "4994585" );
	f.setCedulaE( "24730003" );

	u.getUsuario( "orlandodb" );
	u.getContrasenia( "123456");

	d.setRepresentante( r.toJSON() );
	d.setEstudiante( e.toJSON() );
	d.setFamilia( f.toJSON() );
	d.setUsuario( u.toJSON() );

	function enviar() {
		var ajax = new Ajax();

        ajax.onload = function() {
            // document.body.innerHTML += ajax.responseText;
            fase3.style.display = "none";

            boton.removeEventListener("click", evento);
            boton.innerHTML = "Añadir Otro";

            evento = function() {
                HTMLInputElement.prototype.clear = function() {
                    this.value = "";
                };

                var inputs = document.getElementsByTagName("input");
                for( var i = inputs.length - 1; i >= 0 ; i-- )
                    inputs[i].clear();

                iniciar();
                boton.innerHTML = "Siguiente";
            };
            boton.addEventListener("click", evento);
        };
        ajax.open("POST", "server/post.php");
        ajax.send();
    }

    var informacion = JSON.stringify( d.toJSON() );
    //
    //

	var ajax = new Ajax();
	//ajax.onload = function() {
	//	document.body.innerHTML += ajax.responseText;
	//};
	ajax.onreadystatechange = function () {
		if (ajax.readyState === 4 && ajax.status === 200){
			console.log(ajax.responseText);
		}
	};
	ajax.open("POST", "../../server/post.php", true);
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send("json="+encodeURI( informacion ));

	iniciar();

});

















