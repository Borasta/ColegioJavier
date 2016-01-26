import moment from "moment";
import services from "./services";
import middleware from "./middleware";

module.exports = (router, mysql) => {
	let query = ``;

	router.get("/auth/login/:token", middleware.authenticated, (req, res) => {
		let tokenDecoded = req.data;
		if( tokenDecoded.type === "e" ) {
			query = `
	            SELECT id_e,
	            	nombres_e,
		            apellidos_e
	            FROM estudiantes
	            WHERE id_e = ${tokenDecoded.id};
	        `;
		}
		else if( tokenDecoded.type === "p" ) {
			query = `
	            SELECT id_p,
	            	nombres_p,
		            apellidos_p
	            FROM profesores
	            WHERE id_p = ${tokenDecoded.id};
	        `;
		}
		mysql.query(query)
        .then( row => {
        	if( row.length >= 1 ) {
        		let data =  {
        			"token": req.params.token,
        			"nombres": row[0].nombres_e,
        			"apellidos": row[0].apellidos_e
        		};
        		res.status(200).send(data);
        	}
        }).catch(error => {
            res.status(401).send({"message": "Error, ingrese de nuevo"});
        });
	});

	router.post("/auth/login", (req, res) => {
		let userData = req.body;
		switch( req.body.type ) {
			case "e":
				query = `
		            SELECT id_e as id,
		            	nombres_e as nombres,
			            apellidos_e as apellidos,
			            flag_e as flag
		            FROM estudiantes
		            WHERE user_e = '${userData.user}' AND pass_e = '${userData.pass}';
		        `;
				break;
			case "p":
				query = `
		            SELECT id_p as id,
		            	nombres_p as nombres,
			            apellidos_p as apellidos,
			            flag_p as flag
		            FROM profesores
		            WHERE user_p = '${userData.user}' AND pass_p = '${userData.pass}';
		        `;
				break;
			default:
				res.status(404).send({message: "Error, ingrese de nuevo"});
				break;
		}
        mysql.query(query)
        .then( row => {
        	if( row.length >= 1 ) {
        		let token = services.createToken( 
        			{
        				"id": row[0].id,
        				"type": "e"
        			}, 
        			{
        			"time": 1,
        			"type": "days"
        		});
        		let data =  {
        			"token": token,
        			"nombres": row[0].nombres,
        			"apellidos": row[0].apellidos
        		};
        		res.status(200).send(data);
        	}
        }).catch(error => {
        	res.status(404).send(error);
        });
    });

	router.get("/estudiantes", (req, res) => {
		query = `
            SELECT *
            FROM estudiantes;
        `;
        mysql.query(query)
        .then( row => {
    		res.send(row)
        }).catch(error => {
        	console.log(error)
        });
	});

	router.post("/perfil/estudiante/notas", middleware.authenticated, (req, res) => {
		let tokenDecoded = req.data;
		query= `
			SELECT
				materias.nombre_m as materia,
				docentes.nombres_d nombres,
				docentes.apellidos_d apellidos,
				notas.lapso1 as lapso1,
				notas.lapso2 as lapso2,
				notas.lapso3 as lapso3,
				CAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,
				anio.anio as anio
			FROM estudiantes INNER JOIN cursos
				ON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia
				ON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes
				ON docente_materia.id_d = docentes.id_d INNER JOIN materias
				ON docente_materia.id_m = materias.id_m INNER JOIN notas
				ON cursos.id_c = notas.id_c             INNER JOIN anio
				ON notas.id_anio = anio.id_anio
			WHERE estudiantes.id_e = ${tokenDecoded.id};
		`;
		mysql.query(query)
        .then( row => {
        	if( row.length >= 1 ) {
        		console.log(row)
        		res.status(200).send(row);
        	}
        }).catch(error => {
        	res.status(404).send(error);
        });
	});

	router.post("/perfil/estudiante/data", middleware.authenticated, (req, res) => {
		let tokenDecoded = req.data;
		let data = {};
		query = `
            SELECT estudiantes.nombres_e as nombres,
            estudiantes.apellidos_e as apellidos,
            estudiantes.fecha_nacimiento as edad,
            estudiantes.cedula_e as cedula,
            estudiantes.genero_e as genero,
            estudiantes.direccion_e as direccion,
            estudiantes.user_e as usuario,
            grados.grado as grado,
            secciones.seccion as seccion
            FROM estudiantes                          INNER JOIN grados
                ON estudiantes.id_gra = grados.id_gra INNER JOIN secciones
                ON grados.id_s = secciones.id_s
            WHERE estudiantes.id_e = ${tokenDecoded.id};
        `;
		mysql.query(query)
        .then( estudiante => {
        	if( estudiante.length >= 1 ) {
        		data.estudiante = estudiante[0];
        		data.estudiante.edad = moment(data.estudiante.edad).fromNow();
        		query = `
					SELECT representantes.nombres_r as nombres,
					representantes.apellidos_r as apellidos,
					representantes.cedula_r as cedula,
					representantes.genero_r as genero
					FROM estudiantes                          INNER JOIN familias
						ON estudiantes.id_e = familias.id_e   INNER JOIN representantes
						ON familias.id_r = representantes.id_r
					WHERE estudiantes.id_e = ${tokenDecoded.id};
				`;
        		console.log(query)
				mysql.query(query)
		        .then( representantes => {
		        	if( representantes.length >= 1 ) {
		        		data.representantes = representantes;
		        		res.status(200).send(data);
		        	}
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
        	}
        }).catch(error => {
        	res.status(404).send(error);
        });
	});

	router.post("/perfil/estudiante/horario", middleware.authenticated, (req, res) => {
		let tokenDecoded = req.data;
		query = `
			SELECT docentes.nombres_d, materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final
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
				INNER JOIN notas
					ON cursos.id_c = notas.id_c
			WHERE estudiantes.id_e = ${tokenDecoded.id} AND (SELECT count(*) FROM anio) = notas.id_anio
			ORDER BY dias.id_dia, horarios.id_h;
		`;
		mysql.query(query)
        .then( materias => {
        	if( materias.length >= 1 ) {
        		console.log(materias);
		        res.status(200).send(materias);
		    }
        }).catch(error => {
        	res.status(404).send(error);
        });
	});

	return router;
}