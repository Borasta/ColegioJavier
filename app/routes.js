"use strict";

var render = require("./render");
var path = require("path");

var views = path.join(__dirname, "../views");

module.exports = function (router) {
	router.get("/", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/main.html",
			values: {}
		});
		res.end("");
	});

	router.get("/quienes-somos", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/quienes-somos.html",
			values: {}
		});
		res.end("");
	});

	router.get("/contactanos", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/contactanos.html",
			values: {}
		});
		res.end("");
	});

	router.get("/noticias", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/noticias.html",
			values: {}
		});
		res.end("");
	});

	router.get("/estudiantes/educacion-inicial", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/educacion-inicial.html",
			values: {}
		});
		res.end("");
	});

	router.get("/estudiantes/primaria", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/primaria.html",
			values: {}
		});
		res.end("");
	});

	router.get("/estudiantes/diversificado", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/diversificado.html",
			values: {}
		});
		res.end("");
	});

	return router;
};