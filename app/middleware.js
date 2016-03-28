"use strict";

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN_SECRET = _config2.default.TOKEN_SECRET;

module.exports.authenticated = function (req, res, next) {
	if (!req.headers.authorization && !req.params.token) {
		return res.status(403).send({
			"message": "Tu peticion no tiene cabezera de autentificacion"
		});
	}

	var token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	var payload = _jwtSimple2.default.decode(token, TOKEN_SECRET);
	if (payload.exp <= _moment2.default.unix()) return res.status(401).send({
		"message": "El token ha expirado"
	});

	req.data = payload.data;
	next();
};

module.exports.authMod = function (req, res, next) {
	if (!req.headers.authorization && !req.params.token) {
		return res.status(403).send({
			"message": "Tu peticion no tiene cabezera de autentificacion"
		});
	}

	var token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	var payload = _jwtSimple2.default.decode(token, TOKEN_SECRET);
	if (payload.exp <= _moment2.default.unix()) return res.status(401).send({
		"message": "El token ha expirado"
	});

	// Que sea de tipo docente, pero que no tenga el nivel c de docencia
	if (payload.data.type === "d" && payload.data.type !== "c") {
		req.data = payload.data;
		next();
	} else {
		return res.status(401).send({
			"message": "No tienes permiso suficientes"
		});
	}
};

module.exports.authDocente = function (req, res, next) {
	if (!req.headers.authorization && !req.params.token) {
		return res.status(403).send({
			"message": "Tu peticion no tiene cabezera de autentificacion"
		});
	}

	var token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	var payload = _jwtSimple2.default.decode(token, TOKEN_SECRET);
	if (payload.exp <= _moment2.default.unix()) return res.status(401).send({
		"message": "El token ha expirado"
	});

	if (payload.data.type !== "d") return res.status(401).send({
		"message": "No tienes permiso suficientes"
	});

	req.data = payload.data;
	next();
};

module.exports.authEstudiante = function (req, res, next) {
	if (!req.headers.authorization && !req.params.token) {
		return res.status(403).send({
			"message": "Tu peticion no tiene cabezera de autentificacion"
		});
	}

	var token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	var payload = _jwtSimple2.default.decode(token, TOKEN_SECRET);

	if (payload.exp <= _moment2.default.unix()) return res.status(401).send({
		"message": "El token ha expirado"
	});

	if (payload.data.type !== "e") return res.status(401).send({
		"message": "No tienes permiso suficientes"
	});

	req.data = payload.data;
	next();
};