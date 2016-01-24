let render = require("./render");
let path = require("path");

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

	return router;
}