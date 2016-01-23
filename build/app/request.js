module.exports = (app, mysql) => {
	let auth = false;
	let query = ``;

	app.get("/auth/verify", (req, res) => {
		res.send(auth);
	});

	app.post("/auth/login/estudiante", (req, res) => {
		let userData = req.body;
		query = `
            SELECT id_e,
            	nombres_e,
	            apellidos_e,
	            cedula_e,
	            fecha_nacimiento,
	            genero_e,
	            direccion_e,
	            user_e,
	            flag_e
            FROM estudiantes
            WHERE user_e = '${userData.user}' AND pass_e = '${userData.pass}';
        `;
        mysql.query(query)
        .then( row => {
			res.send(row);
        }).catch(error => {
        	res.send(error);
        });
	});

	app.get("/estudiantes", (req, res) => {
		query = `
            SELECT *
            FROM estudiantes;
        `;
        mysql.query(query)
        .then( row => {
    		res.send(row)
        }).catch(error => {
        	console.log(error)
        });
	});

	app.post("/auth/signup/estudiante", (req, res) => {
		
	});

	app.get("/auth/logout", (req, res) => {
		auth = false;
		res.send(auth);
	});
}