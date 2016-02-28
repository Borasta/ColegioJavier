module.exports = mysql => {
	let query = ``;
	
	return {
		"getData": (req, res) => {
			let tokenDecoded = req.data;
			query = `
	            SELECT docentes.nombres_d as nombres,
		            docentes.apellidos_d as apellidos,
		            docentes.cedula_d as cedula,
		            docentes.genero_d as genero,
		            docentes.user_d as usuario
	            FROM docentes
	            WHERE docentes.id_d = ${tokenDecoded.id};
	        `;
			mysql.query(query)
	        .then( docente => {
	        	if( docente.length >= 1 ) {
			        res.status(200).send(docente[0]);
			    }
	        }).catch(error => {
	        	res.status(404).send(error);
	        });
		},
		"getSalones": (req, res) => {
			let tokenDecoded = req.data;
			query = `
	            SELECT DISTINCT 
	            	grados.id_gra,
	            	grados.grado,
					grados.seccion
		            FROM docentes INNER JOIN docente_materia
		            	ON docentes.id_d = docente_materia.id_d INNER JOIN cursos
		            	ON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes
		            	ON cursos.id_e = estudiantes.id_e INNER JOIN grados
		            	ON estudiantes.id_gra = grados.id_gra INNER JOIN notas
		            	ON cursos.id_c = notas.id_c
	            WHERE docentes.id_d = ${tokenDecoded.id} AND (SELECT count(*) FROM anio) = notas.id_anio
	            ORDER BY grados.grado, grados.seccion;
	        `;
			mysql.query(query)
	        .then( salones => {
	        	if( salones.length >= 1 ) {
			        res.status(200).send(salones);
			    }
	        }).catch(error => {
	        	res.status(404).send(error);
	        });
		},
		"getAlumnos": (req, res) => {
			let tokenDecoded = req.data;
			query = `
		        SELECT estudiantes.nombres_e,
					estudiantes.apellidos_e,
		        	estudiantes.cedula_e,
		        	notas.lapso1,
		        	notas.lapso2,
		        	notas.lapso3
		            FROM docentes INNER JOIN docente_materia
		            	ON docentes.id_d = docente_materia.id_d INNER JOIN cursos
		            	ON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes
		            	ON cursos.id_e = estudiantes.id_e INNER JOIN notas
		            	ON cursos.id_c = notas.id_calumnos
		        WHERE docentes.id_d = ${tokenDecoded.id} AND grados.id_gra = ${req.body.id} AND (SELECT count(*) FROM anio) = notas.id_anio
		        ORDER BY grados.grado, grados.seccion, estudiantes.cedula_e;
		    `;
			mysql.query(query)
		    .then( alumnos => {
		    	if( alumnos.length >= 1 ) {
			        res.status(200).send(alumnos);
			    }
		    }).catch(error => {
		    	res.status(404).send(error);
		    });
		},
		"getHorario": (req, res) => {
			let tokenDecoded = req.data;
			query = `
	            SELECT materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final
					FROM docentes INNER JOIN docente_materia
						ON docentes.id_d = docente_materia.id_d
					  INNER JOIN materias
						ON docente_materia.id_m = materias.id_m
					  INNER JOIN horarios
						ON docente_materia.id_dm = horarios.id_dm
					  INNER JOIN dias
						ON horarios.id_dia = dias.id_dia
					WHERE docentes.id_d = ${tokenDecoded.id}
					ORDER BY dias.id_dia, horarios.id_h;
	        `;
			mysql.query(query)
	        .then( horario => {
	        	if( horario.length >= 1 ) {
			        res.status(200).send(horario);
			    }
	        }).catch(error => {
	        	res.status(404).send(error);
	        });
		}
	}
}