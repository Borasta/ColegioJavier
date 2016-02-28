"use strict";

var _middleware = require("./middleware");

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (router, mysql) {
	var Login = require("./request/login")(mysql);
	var Estudiante = require("./request/estudiante")(mysql);
	var Docente = require("./request/docente")(mysql);
	var Moderador = require("./request/moderador")(mysql);
	var Admin = require("./request/admin")(mysql);

	var query = "";

	router.route("/auth/login/:token").get(_middleware2.default.authenticated, Login.get);

	router.route("/auth/login").post(Login.post);

	router.get("/perfil/estudiante/data", _middleware2.default.authEstudiante, Estudiante.getData);
	router.get("/perfil/estudiante/notas", _middleware2.default.authEstudiante, Estudiante.getNotas);
	router.get("/perfil/estudiante/horario", _middleware2.default.authEstudiante, Estudiante.getHorario);
	router.get("/perfil/estudiante/grupos", _middleware2.default.authEstudiante, Estudiante.getGrupos);

	router.get("/perfil/docente/data", _middleware2.default.authDocente, Docente.getData);
	router.post("/perfil/docente/salones", _middleware2.default.authDocente, Docente.getSalones);
	router.post("/perfil/docente/alumnos", _middleware2.default.authDocente, Docente.getAlumnos);
	router.post("/perfil/docente/horario", _middleware2.default.authDocente, Docente.getHorario);

	router.route("/docentes").get(_middleware2.default.authDocente, Moderador.docentes.get).post(_middleware2.default.authenticated, Moderador.docentes.post).put(_middleware2.default.authenticated, Moderador.docentes.put).delete(_middleware2.default.authenticated, Moderador.docentes.delete);

	router.route("/alumnos").get(_middleware2.default.authenticated, Moderador.alumnos.get).post(_middleware2.default.authenticated, Moderador.alumnos.post).put(_middleware2.default.authenticated, Moderador.alumnos.put).delete(_middleware2.default.authenticated, Moderador.alumnos.delete);

	router.route("/representantes").get(_middleware2.default.authenticated, Moderador.representantes.get).post(_middleware2.default.authenticated, Moderador.representantes.post).put(_middleware2.default.authenticated, Moderador.representantes.put).delete(_middleware2.default.authenticated, Moderador.representantes.delete);

	router.route("/materias").get(_middleware2.default.authenticated, Moderador.materias.get).post(_middleware2.default.authenticated, Moderador.materias.post).put(_middleware2.default.authenticated, Moderador.materias.put).delete(_middleware2.default.authenticated, Moderador.materias.delete);

	router.route("/horarios").get(_middleware2.default.authenticated, Moderador.horarios.get).post(_middleware2.default.authenticated, Moderador.horarios.post).put(_middleware2.default.authenticated, Moderador.horarios.put).delete(_middleware2.default.authenticated, Moderador.horarios.delete);

	router.route("/cursos").get(_middleware2.default.authenticated, Moderador.cursos.get).post(_middleware2.default.authenticated, Moderador.cursos.post).put(_middleware2.default.authenticated, Moderador.cursos.put).delete(_middleware2.default.authenticated, Moderador.cursos.delete);

	return router;
};