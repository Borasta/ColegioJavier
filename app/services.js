"use strict";

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN_SECRET = _config2.default.TOKEN_SECRET;

module.exports.createToken = function (data, duration) {
	var payload = {
		"data": data,
		"iat": (0, _moment2.default)().unix(),
		"exp": (0, _moment2.default)().add(duration.time, duration.type).unix()
	};
	return _jwtSimple2.default.encode(payload, TOKEN_SECRET);
};