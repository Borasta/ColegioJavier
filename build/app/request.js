import middleware from "./middleware";

module.exports = (router, mysql) => {
	let Login = require("./request/login")(mysql);
	let Estudiante = require("./request/estudiante")(mysql);
	let Docente = require("./request/docente")(mysql);
	let Moderador = require("./request/moderador")(mysql);
	let Admin = require("./request/admin")(mysql);
	
	let query = ``;

	router.route("/auth/login/:token")
	.get( middleware.authenticated, Login.get );

	router.route("/auth/login")
	.post( Login.post );

	router.get("/perfil/estudiante/data", middleware.authEstudiante, Estudiante.getData);
	router.get("/perfil/estudiante/notas", middleware.authEstudiante, Estudiante.getNotas);
	router.get("/perfil/estudiante/horario", middleware.authEstudiante, Estudiante.getHorario);
	router.get("/perfil/estudiante/grupos", middleware.authEstudiante, Estudiante.getGrupos);

	router.get("/perfil/docente/data", middleware.authDocente, Docente.getData);
	router.post("/perfil/docente/salones", middleware.authDocente, Docente.getSalones);
	router.post("/perfil/docente/alumnos", middleware.authDocente, Docente.getAlumnos);
	router.post("/perfil/docente/horario", middleware.authDocente, Docente.getHorario);

	router.route("/docentes")
	.get( middleware.authDocente, Moderador.docentes.get )
	.post( middleware.authDocente, Moderador.docentes.post )
	.put( middleware.authDocente, Moderador.docentes.put )
	.delete( middleware.authDocente, Moderador.docentes.delete);

	router.route("/alumnos")
	.get( middleware.authDocente, Moderador.alumnos.get )
	.post( middleware.authDocente, Moderador.alumnos.post )
	.put( middleware.authDocente, Moderador.alumnos.put )
	.delete( middleware.authDocente, Moderador.alumnos.delete );

	router.route("/representantes")
	.get( middleware.authDocente, Moderador.representantes.get )
	.post( middleware.authDocente, Moderador.representantes.post )
	.put( middleware.authDocente, Moderador.representantes.put )
	.delete( middleware.authDocente, Moderador.representantes.delete );

	router.route("/materias")
	.get( middleware.authDocente, Moderador.materias.get )
	.post( middleware.authDocente, Moderador.materias.post )
	.put( middleware.authDocente, Moderador.materias.put )
	.delete( middleware.authDocente, Moderador.materias.delete );	

	router.route("/horarios")
	.get( middleware.authDocente, Moderador.horarios.get )
	.post( middleware.authDocente, Moderador.horarios.post )
	.put( middleware.authDocente, Moderador.horarios.put )
	.delete( middleware.authDocente, Moderador.horarios.delete );

	router.route("/cursos")
	.get( middleware.authDocente, Moderador.cursos.get )
	.post( middleware.authDocente, Moderador.cursos.post )
	.put( middleware.authDocente, Moderador.cursos.put )
	.delete( middleware.authenticated, Moderador.cursos.delete );

	router.route("/gradossecciones")
	.get( middleware.authDocente, Moderador.otros.getGradosSecciones )

	return router;
}