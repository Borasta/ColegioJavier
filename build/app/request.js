import services from "./services";
import jwt from "jwt-simple";

module.exports = (router, mysql) => {
	let auth = false;
	let query = ``;

	router.get("/auth/verify", (req, res) => {
		res.send(auth);
	});

	router.route("/auth/login/estudiante")
	.get( () => {

	}).post( (req, res) => {
		console.log(req.headers.authorization);
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

        	if( row.length >= 1 ) {
        		let token = services.createToken( row[0].id_e, {
        			"time": 1,
        			"type": "days"
        		});
        		res.status(200).send(token);
        	}
        }).catch(error => {
        	res.send(error);
        });
    });

	router.route("/auth/login/profesor")
	.get( () => {

	}).post( () => {

	});

	router.get("/estudiantes", (req, res) => {
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

	router.post("/auth/signup/estudiante", (req, res) => {
		
	});

	router.get("/auth/logout", (req, res) => {
		auth = false;
		res.send(auth);
	});

	return router;
}