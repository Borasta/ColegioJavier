let render = require("./render");
let path = require("path");

let views = path.join(__dirname, "../views");

module.exports = app => {
	app.get(`/`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/main.html`,
			values: {}
		});
		res.end("");
	});

	app.get(`/quienes-somos`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/quienes-somos.html`,
			values: {}
		});
		res.end("");
	});

	app.get(`/contactanos`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/contactanos.html`,
			values: {}
		});
		res.end("");
	});

	app.get(`/noticias`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/noticias.html`,
			values: {}
		});
		res.end("");
	});

	app.get(`/estudiantes/educacion-inicial`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/educacion-inicial.html`,
			values: {}
		});
		res.end("");
	});

	app.get(`/estudiantes/primaria`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/primaria.html`,
			values: {}
		});
		res.end("");
	});

	app.get(`/estudiantes/diversificado`, (req, res) => {
		render({
			res: res,
			tmp: `${views}/template.html`,
			ctn: `${views}/diversificado.html`,
			values: {}
		});
		res.end("");
	});
}