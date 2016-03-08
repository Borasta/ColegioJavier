import jwt from "jwt-simple";
import moment from "moment";
import configure from "./config";

const TOKEN_SECRET = configure.TOKEN_SECRET;

module.exports.authenticated = (req, res, next) => {
	if( !req.headers.authorization && !req.params.token) {
		return res
			.status(403)
			.send({
				"message": "Tu peticion no tiene cabezera de autentificacion"
			}
		);
	}

	let token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	let payload = jwt.decode( token, TOKEN_SECRET );
	if( payload.exp <= moment.unix() )
		return res
			.status(401)
			.send({
				"message": "El token ha expirado"
			}
		);

	req.data = payload.data;
	next();
}

module.exports.authDocente = (req, res, next) => {
	if( !req.headers.authorization && !req.params.token) {
		return res
			.status(403)
			.send({
				"message": "Tu peticion no tiene cabezera de autentificacion"
			}
		);
	}

	let token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	let payload = jwt.decode( token, TOKEN_SECRET );
	if( payload.exp <= moment.unix() )
		return res
			.status(401)
			.send({
				"message": "El token ha expirado"
			}
		);

	if( payload.data.type !== "d" )
		return res
			.status(401)
			.send({
				"message": "No tienes permiso suficientes"
			}
		);		

	req.data = payload.data;
	next();
}

module.exports.authEstudiante = (req, res, next) => {
	if( !req.headers.authorization && !req.params.token) {
		return res
			.status(403)
			.send({
				"message": "Tu peticion no tiene cabezera de autentificacion"
			}
		);
	}

	let token = req.params.token ? req.params.token : req.headers.authorization;
	// let token = req.params.token ? req.params.token : req.headers.authorization.split(" ")[1];
	let payload = jwt.decode( token, TOKEN_SECRET );

	if( payload.exp <= moment.unix() )
		return res
			.status(401)
			.send({
				"message": "El token ha expirado"
			}
		);

	if( payload.data.type !== "e" )
		return res
			.status(401)
			.send({
				"message": "No tienes permiso suficientes"
			}
		);		

	req.data = payload.data;
	next();
}