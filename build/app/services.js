import jwt from "jwt-simple";
import moment from "moment";
import config from "./config";

const TOKEN_SECRET = config.TOKEN_SECRET;

module.exports.createToken = ( data, duration) => {
	let payload = {
		"data": data,
		"iat": moment().unix(),
		"exp": moment().add(duration.time, duration.type).unix()
	};
	return jwt.encode(payload, TOKEN_SECRET);
}
