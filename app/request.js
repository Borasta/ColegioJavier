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

	router.route("/docentes").get(_middleware2.default.authDocente, Moderador.docentes.get).post(_middleware2.default.authDocente, Moderador.docentes.post).put(_middleware2.default.authDocente, Moderador.docentes.put).delete(_middleware2.default.authDocente, Moderador.docentes.delete);

	router.route("/alumnos").get(_middleware2.default.authDocente, Moderador.alumnos.get).post(_middleware2.default.authDocente, Moderador.alumnos.post).put(_middleware2.default.authDocente, Moderador.alumnos.put).delete(_middleware2.default.authDocente, Moderador.alumnos.delete);

	router.route("/representantes").get(_middleware2.default.authDocente, Moderador.representantes.get).post(_middleware2.default.authDocente, Moderador.representantes.post).put(_middleware2.default.authDocente, Moderador.representantes.put).delete(_middleware2.default.authDocente, Moderador.representantes.delete);

	router.route("/materias").get(_middleware2.default.authDocente, Moderador.materias.get).post(_middleware2.default.authDocente, Moderador.materias.post).put(_middleware2.default.authDocente, Moderador.materias.put).delete(_middleware2.default.authDocente, Moderador.materias.delete);

	router.route("/horarios").get(_middleware2.default.authDocente, Moderador.horarios.get).post(_middleware2.default.authDocente, Moderador.horarios.post).put(_middleware2.default.authDocente, Moderador.horarios.put).delete(_middleware2.default.authDocente, Moderador.horarios.delete);

	router.route("/cursos").get(_middleware2.default.authDocente, Moderador.cursos.get).post(_middleware2.default.authDocente, Moderador.cursos.post).put(_middleware2.default.authDocente, Moderador.cursos.put).delete(_middleware2.default.authenticated, Moderador.cursos.delete);

	router.route("/gradossecciones").get(_middleware2.default.authDocente, Moderador.otros.getGradosSecciones);

	return router;
};