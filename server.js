var express = require("express");
var app = express();

app.use( express.static(__dirname) );

app.listen(5000, function() {
	console.log('Server iniciado');
});

app.get("*", function(req, res) {
	res.write("Hola Mundo");
})

