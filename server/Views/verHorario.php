<?php namespace Views;
	require_once "../Models/Horario.php";	use Models\Horario;
	require_once "../Models/Session.php";	use Models\Session;

	// Verificar el estado de la sesion
	$session = new Session();
	$resp = $session->status();

	$horario = new Horario();
	$horario->set("id", $resp["id"] );
	$horario->set("tipo", $resp["tipo"] );
	$h = $horario->verHorario();
	$h["val"] = true;
	echo json_encode( $h );

//	if( $resp["val"] ) {
//
//	}
//	else {
//		// El usuario no tiene permiso de ver eso
//	}

	// Obtener el id del estudiante conectado;

	/*
		// Ver el horario de el estudiante con id ID
		SELECT estudiantes.nombres_e, materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final
		FROM estudiantes
		INNER JOIN cursos
			ON estudiantes.id_e = cursos.id_e
		INNER JOIN docente_materia
			ON cursos.id_dm = docente_materia.id_dm
		INNER JOIN docentes
			ON docente_materia.id_d = docentes.id_d
		INNER JOIN materias
			ON docente_materia.id_m = materias.id_m
		INNER JOIN horarios
			ON docente_materia.id_dm = horarios.id_dm
		INNER JOIN dias
			ON horarios.id_dia = dias.id_dia

		WHERE estudiantes.id_e = ID
		ORDER BY dias.id_dia, horarios.id_h
	*/

?>