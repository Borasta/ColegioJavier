"use strict";

module.exports = function (json) {
	/* 
 	{
 		res: res,	// Object response
 		tmp: path,	// Path of template
 		ctn: path,	// Path of content
 		values: {	//` Values to bind
 			// values
 		}
 	}
 */

	var fs = require("fs");
	var bind = new RegExp(/[^\{{2}]+(?=\}{2})/g);

	var htmlString = fs.readFileSync(json.tmp).toString();
	var cont = fs.readFileSync(json.ctn).toString();

	var bindings = htmlString.match(bind);

	// Add content to htmlString
	for (var i = 0; i < bindings.length; i++) {
		if (bindings[i].indexOf("content") >= 0) htmlString = htmlString.replace("{{" + bindings[i] + "}}", cont);
	}bindings = htmlString.match(bind);

	// Add values to htmlString
	for (var i = 0; bindings && i < bindings.length; i++) {
		var valor = json.values[bindings[i].trim()];
		if (valor) htmlString = htmlString.replace("{{" + bindings[i] + "}}", valor);
	}

	json.res.write(htmlString);
};