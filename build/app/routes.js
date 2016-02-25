import render from "./render";
import path from "path";
import middleware from "./middleware";

let views = path.join(__dirname, "../views");

module.exports = router => {
	router.get(`/`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/main.html`,
			values: {}
		});
		res.end("");
	});

	router.get(`/quienes-somos`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/quienes-somos.html`,
			values: {}
		});
		res.end("");
	});

	router.get(`/contactanos`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/contactanos.html`,
			values: {}
		});
		res.end("");
	});

	router.get(`/noticias`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/noticias.html`,
			values: {}
		});
		res.end("");
	});

	router.get(`/estudiantes/educacion-inicial`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/educacion-inicial.html`,
			values: {}
		});
		res.end("");
	});

	router.get(`/estudiantes/primaria`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/primaria.html`,
			values: {}
		});
		res.end("");
	});

	router.get(`/estudiantes/diversificado`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/diversificado.html`,
			values: {}
		});
		res.end("");
	});

	// Rutas privadas;

	router.get(`/perfil/:token`, middleware.authenticated, (req, res) => {
		if( req.data.type === "e" )
			render({
				res: res,
				tmp: `${views}/template.html`,
				ctn: `${views}/panel_estudiante.html`,
				values: {}
			});
		else if( req.data.type === "d" )
			if( req.data.flag === "a" )
				render({
					res: res,
					tmp: `${views}/template.html`,
					ctn: `${views}/panel_admin.html`,
					values: {}
				});
			else if( req.data.flag === "b" ) {
				render({
					res: res,
					tmp: `${views}/template.html`,
					ctn: `${views}/panel_moderador.html`,
					values: {}
				});
			}
			else if( req.data.flag === "c" ) {
				render({
					res: res,
					tmp: `${views}/template.html`,
					ctn: `${views}/panel_docente.html`,
					values: {}
				});
			}
		else {
			res.status(401).send({"message": "Error, ingrese nuevamente"})
		}
		res.end("");
	});

	return router;
}