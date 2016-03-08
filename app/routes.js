"use strict";

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _middleware = require("./middleware");

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var views = _path2.default.join(__dirname, "../views");

module.exports = function (router) {
	router.get("/", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/main.html",
			values: {}
		});
		res.end("");
	});

	router.get("/quienes-somos", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/quienes-somos.html",
			values: {}
		});
		res.end("");
	});

	router.get("/contactanos", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/contactanos.html",
			values: {}
		});
		res.end("");
	});

	router.get("/noticias", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/noticias.html",
			values: {}
		});
		res.end("");
	});

	router.get("/estudiantes/educacion-inicial", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/educacion-inicial.html",
			values: {}
		});
		res.end("");
	});

	router.get("/estudiantes/primaria", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/primaria.html",
			values: {}
		});
		res.end("");
	});

	router.get("/estudiantes/diversificado", function (req, res) {
		(0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/diversificado.html",
			values: {}
		});
		res.end("");
	});

	// Rutas privadas;

	router.get("/perfil/:token", _middleware2.default.authenticated, function (req, res) {
		if (req.data.type === "e") (0, _render2.default)({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/panel_estudiante.html",
			values: {}
		});else if (req.data.type === "d") switch (req.data.flag) {
			case "a":
			case "b":
				(0, _render2.default)({
					res: res,
					tmp: views + "/template.html",
					ctn: views + "/panel_admin.html",
					values: {}
				});
				break;

			case "c":
				(0, _render2.default)({
					res: res,
					tmp: views + "/template.html",
					ctn: views + "/panel_docente.html",
					values: {}
				});
				break;
		} else {
			res.status(401).send({ "message": "Error, ingrese nuevamente" });
		}
		res.end("");
	});

	return router;
};