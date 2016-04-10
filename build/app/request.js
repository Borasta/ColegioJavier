import middleware from "./middleware";

module.exports = (router, mysql) =>{
    let Cursos = require("./request/cursos")(mysql);
    let DocenteMateria = require("./request/docente_materia")(mysql);
    let Docentes = require("./request/docentes")(mysql);
    let Estudiantes = require("./request/estudiantes")(mysql);
    let Grados = require("./request/grados")(mysql);
    let Grupos = require("./request/grupos")(mysql);
    let Horarios = require("./request/horarios")(mysql);
    let Login = require("./request/login")(mysql);
    let Materias = require("./request/materias")(mysql);
    let Notas = require("./request/notas")(mysql);
    let Representantes = require("./request/representantes")(mysql);
    let Secciones = require("./request/secciones")(mysql);

    router.route("/cursos")
          .get(middleware.authDocente, Cursos.get)
          .post(middleware.authMod, Cursos.post)
          .put(middleware.authMod, Cursos.put)
          .delete(middleware.authMod, Cursos.delete);

    router.route("/docente_materia")
          .get(middleware.authMod, DocenteMateria.get)
          .post(middleware.authMod, DocenteMateria.post)
          .put(middleware.authMod, DocenteMateria.put)
          .delete(middleware.authMod, DocenteMateria.delete);

    router.route("/docentes")
          .get(middleware.authDocente, Docentes.get)
          .post(middleware.authMod, Docentes.post)
          .put(middleware.authMod, Docentes.put)
          .delete(middleware.authMod, Docentes.delete);

    router.route("/estudiantes") // Listo
          .get(middleware.authenticated, Estudiantes.get)
          .post(middleware.authMod, Estudiantes.post)
          .put(middleware.authMod, Estudiantes.put)
          .delete(middleware.authMod, Estudiantes.delete);

    router.route("/grados")
          .get(middleware.authDocente, Grados.get)
          .post(middleware.authMod, Grados.post)
          .put(middleware.authMod, Grados.put)
          .delete(middleware.authMod, Grados.delete);

    router.route("/grupos")
          .get(middleware.authenticated, Grupos.get)
          .post(middleware.authMod, Grupos.post)
          .put(middleware.authMod, Grupos.put)
          .delete(middleware.authMod, Grupos.delete);

    router.route("/horarios")
          .get(middleware.authenticated, Horarios.get)
          .post(middleware.authMod, Horarios.post)
          .put(middleware.authMod, Horarios.put)
          .delete(middleware.authMod, Horarios.delete);

    router.route("/auth/login/:token")
          .get(middleware.authenticated, Login.get)
          .post(Login.post);

    router.route("/materias")
          .get(middleware.authDocente, Materias.get)
          .post(middleware.authMod, Materias.post)
          .put(middleware.authMod, Materias.put)
          .delete(middleware.authMod, Materias.delete);

    router.route("/notas")
          .get(middleware.authenticated, Notas.get)
          .post(middleware.authMod, Notas.post)
          .put(middleware.authMod, Notas.put)
          .delete(middleware.authMod, Notas.delete);

    router.route("/representantes")
          .get(middleware.authMod, Representantes.get)
          .post(middleware.authMod, Representantes.post)
          .put(middleware.authMod, Representantes.put)
          .delete(middleware.authMod, Representantes.delete);

    router.route("/secciones")
          .get(middleware.authDocente, Secciones.get)
          .post(middleware.authMod, Secciones.post)
          .put(middleware.authMod, Secciones.put)
          .delete(middleware.authMod, Secciones.delete);

    return router;
};