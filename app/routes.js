"use strict";

var render = require("./render");
var path = require("path");

var views = path.join(__dirname, "../views");

module.exports = function (app) {
	app.get("/", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/main.html",
			values: {}
		});
		res.end("");
	});

	app.get("/quienes-somos", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/quienes-somos.html",
			values: {}
		});
		res.end("");
	});

	app.get("/contactanos", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/contactanos.html",
			values: {}
		});
		res.end("");
	});

	app.get("/noticias", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/noticias.html",
			values: {}
		});
		res.end("");
	});

	app.get("/estudiantes/educacion-inicial", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/educacion-inicial.html",
			values: {}
		});
		res.end("");
	});

	app.get("/estudiantes/primaria", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/primaria.html",
			values: {}
		});
		res.end("");
	});

	app.get("/estudiantes/diversificado", function (req, res) {
		render({
			res: res,
			tmp: views + "/template.html",
			ctn: views + "/diversificado.html",
			values: {}
		});
		res.end("");
	});
};