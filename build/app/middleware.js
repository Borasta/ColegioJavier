import jwt from "jwt-simple";
import moment from "moment";
import configure from "./configure";

const TOKEN_SECRET = configure.TOKEN_SECRET;

module.exports.authenticated = (req, res, next) => {
	if(!req.headers.authorization)
		return res
			.status(403)
			.send({
				"message": "Tu peticion no tiene cabezera de autentificacion"
			}
		);

	let token = req.headers.authorization.split(" ")[1];
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