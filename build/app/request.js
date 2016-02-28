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
	.post( middleware.authenticated, Moderador.docentes.post )
	.put( middleware.authenticated, Moderador.docentes.put )
	.delete( middleware.authenticated, Moderador.docentes.delete);

	router.route("/alumnos")
	.get( middleware.authenticated, Moderador.alumnos.get )
	.post( middleware.authenticated, Moderador.alumnos.post )
	.put( middleware.authenticated, Moderador.alumnos.put )
	.delete( middleware.authenticated, Moderador.alumnos.delete );

	router.route("/representantes")
	.get( middleware.authenticated, Moderador.representantes.get )
	.post( middleware.authenticated, Moderador.representantes.post )
	.put( middleware.authenticated, Moderador.representantes.put )
	.delete( middleware.authenticated, Moderador.representantes.delete );

	router.route("/materias")
	.get( middleware.authenticated, Moderador.materias.get )
	.post( middleware.authenticated, Moderador.materias.post )
	.put( middleware.authenticated, Moderador.materias.put )
	.delete( middleware.authenticated, Moderador.materias.delete );	

	router.route("/horarios")
	.get( middleware.authenticated, Moderador.horarios.get )
	.post( middleware.authenticated, Moderador.horarios.post )
	.put( middleware.authenticated, Moderador.horarios.put )
	.delete( middleware.authenticated, Moderador.horarios.delete );

	router.route("/cursos")
	.get( middleware.authenticated, Moderador.cursos.get )
	.post( middleware.authenticated, Moderador.cursos.post )
	.put( middleware.authenticated, Moderador.cursos.put )
	.delete( middleware.authenticated, Moderador.cursos.delete );

	return router;
}