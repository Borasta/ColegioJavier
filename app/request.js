"use strict";

var _middleware = require("./middleware");

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (router, mysql) {
      var Cursos = require("./request/cursos")(mysql);
      var DocenteMateria = require("./request/docente_materia")(mysql);
      var Docentes = require("./request/docentes")(mysql);
      var Estudiantes = require("./request/estudiantes")(mysql);
      var Grados = require("./request/grados")(mysql);
      var Grupos = require("./request/grupos")(mysql);
      var Horarios = require("./request/horarios")(mysql);
      var Login = require("./request/login")(mysql);
      var Materias = require("./request/materias")(mysql);
      var Notas = require("./request/notas")(mysql);
      var Representantes = require("./request/representantes")(mysql);
      var Miembros = require("./request/miembros")(mysql);
      var Lideres = require("./request/lideres")(mysql);
      var Secciones = require("./request/secciones")(mysql);

      router.route("/cursos").get(_middleware2.default.authDocente, Cursos.get).post(_middleware2.default.authMod, Cursos.post).put(_middleware2.default.authMod, Cursos.put).delete(_middleware2.default.authMod, Cursos.delete);

      router.route("/docente_materia").get(_middleware2.default.authMod, DocenteMateria.get).post(_middleware2.default.authMod, DocenteMateria.post).put(_middleware2.default.authMod, DocenteMateria.put).delete(_middleware2.default.authMod, DocenteMateria.delete);

      router.route("/docentes").get(_middleware2.default.authDocente, Docentes.get).post(_middleware2.default.authMod, Docentes.post).put(_middleware2.default.authMod, Docentes.put).delete(_middleware2.default.authMod, Docentes.delete);

      router.route("/estudiantes") // Listo
      .get(_middleware2.default.authenticated, Estudiantes.get).post(_middleware2.default.authMod, Estudiantes.post).put(_middleware2.default.authMod, Estudiantes.put).delete(_middleware2.default.authMod, Estudiantes.delete);

      router.route("/grados").get(_middleware2.default.authDocente, Grados.get).post(_middleware2.default.authMod, Grados.post).put(_middleware2.default.authMod, Grados.put).delete(_middleware2.default.authMod, Grados.delete);

      router.route("/grupos").get(_middleware2.default.authenticated, Grupos.get).post(_middleware2.default.authMod, Grupos.post).put(_middleware2.default.authMod, Grupos.put).delete(_middleware2.default.authMod, Grupos.delete);

      router.route("/horarios").get(_middleware2.default.authenticated, Horarios.get).post(_middleware2.default.authMod, Horarios.post).put(_middleware2.default.authMod, Horarios.put).delete(_middleware2.default.authMod, Horarios.delete);

      router.route("/auth/login/:token").get(_middleware2.default.authenticated, Login.get).post(Login.post);

      router.route("/materias").get(_middleware2.default.authDocente, Materias.get).post(_middleware2.default.authMod, Materias.post).put(_middleware2.default.authMod, Materias.put).delete(_middleware2.default.authMod, Materias.delete);

      router.route("/notas").get(_middleware2.default.authenticated, Notas.get).post(_middleware2.default.authMod, Notas.post).put(_middleware2.default.authMod, Notas.put).delete(_middleware2.default.authMod, Notas.delete);

      router.route("/representantes").get(_middleware2.default.authMod, Representantes.get).post(_middleware2.default.authMod, Representantes.post).put(_middleware2.default.authMod, Representantes.put).delete(_middleware2.default.authMod, Representantes.delete);

      router.route("/miembros").get(_middleware2.default.authMod, Miembros.get).post(_middleware2.default.authMod, Miembros.post).put(_middleware2.default.authMod, Miembros.put).delete(_middleware2.default.authMod, Miembros.delete);

      router.route("/lideres").get(_middleware2.default.authMod, Lideres.get).post(_middleware2.default.authMod, Lideres.post).put(_middleware2.default.authMod, Lideres.put).delete(_middleware2.default.authMod, Lideres.delete);

      router.route("/secciones").get(_middleware2.default.authDocente, Secciones.get).post(_middleware2.default.authMod, Secciones.post).put(_middleware2.default.authMod, Secciones.put).delete(_middleware2.default.authMod, Secciones.delete);

      return router;
};