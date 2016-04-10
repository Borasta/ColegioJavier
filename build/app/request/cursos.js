module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			values = [
				req.query.id_dm
			];
			switch( tokenDecoded.flag ) {
				// Si somos admin o moderador hacemos una busqueda entre todos los grupos
				case "a":
				case "b": {
					query = `
						SELECT 
							id_c as id,
							CONCAT(nombres_d, ' ', apellidos_d) as docente,
							apellidos_d,
							nombre_m as materia,
							CONCAT(nombres_e, ' ', apellidos_e) as estudiante
						FROM cursos
						  INNER JOIN estudiantes
						    ON cursos.id_e = estudiantes.id_e
						  INNER JOIN docente_materia
						    ON cursos.id_dm = docente_materia.id_dm
						  INNER JOIN docentes
						  	ON docente_materia.id_d = docentes.id_d
						  INNER JOIN materias
						  	ON docente_materia.id_m = materias.id_m
						WHERE 
							(
								UPPER(nombres_d) LIKE UPPER(?) OR 
								UPPER(apellidos_d) LIKE UPPER(?) OR 
								cedula_d LIKE ? 
							)
						ORDER BY
							nombres_d;
						;
					`;
					values = [
						`%${req.query.data}%`,
						`%${req.query.data}%`,
						`%${req.query.data}%`
					];
					break;
				}

				// Si somos un docente normal retornamos los cursos de nuestro estudiantes
				case "c": {
					query = `
						SELECT 
							materias.id_m,
							nombres_e,
							nombre_m,
							grado,
							seccion
						FROM docentes
						  INNER JOIN docente_materia
							ON docentes.id_d = docente_materia.id_d
						  INNER JOIN cursos 
							ON docente_materia.id_dm = cursos.id_dm
						  INNER JOIN estudiantes
							ON cursos.id_e = estudiantes.id_e
						  INNER JOIN grados
							ON estudiantes.id_gra = grados.id_gra
						  INNER JOIN materias
							ON docente_materia.id_m = materias.id_m
						  INNER JOIN notas
						  	ON cursos.id_c = notas.id_c
						WHERE 
							docentes.id_d = ?
							AND grados.id_gra = ?
							AND (SELECT count(*) FROM anio) = notas.id_anio
						ORDER BY grado, seccion
					`;
					values = [
						tokenDecoded.id,
						req.query.id_gra
					];
					break;
				}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( curso => {
					 console.log(curso)
					 res.status(200).send(curso);
				 }).catch(error => {
				res.status(404).send(error);
			});
		},
		"post": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			query = `
					INSERT INTO cursos VALUES (
						null,
						?,
						?
					)
				`;
			values = [
				req.body.id_dm,
				req.body.id_e
			];
			mysql.query(query, values)
				 .then( curso => {
					 res.status(200).send(curso);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"put": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			query = `
					UPDATE cursos SET 
					id_dm = ?,
					id_e = ?
				`;
			values = [
				req.query.id_dm,
				req.query.id_e
			];
			mysql.query(query, values)
				 .then( curso => {
					 res.status(200).send(curso);
				 }).catch(error => {
				res.status(404).send(error);
			});
		},	// Listo
		"delete": (req, res) => {
			let values = [];
			query = `
					DELETE FROM cursos WHERE id_c = ?;
				`;
			values = [
				req.query.id
			];
			mysql.query(query, values)
				 .then( curso => {
					 res.status(200).send(curso);
				 }).catch(error => {
				res.status(404).send(error);
			});
		} // Listo
	}
};