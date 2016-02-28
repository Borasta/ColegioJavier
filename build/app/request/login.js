import services from "../services";

module.exports = mysql => {
	let query = ``;

	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			if( tokenDecoded.type === "e" ) {
				query = `
		            SELECT id_e as id,
		            	nombres_e as nombres,
			            apellidos_e as apellidos
		            FROM estudiantes
		            WHERE id_e = ${tokenDecoded.id};
		        `;
			}
			else if( tokenDecoded.type === "d" ) {
				query = `
		            SELECT id_d as id,
		            	nombres_d as nombres,
			            apellidos_d as apellidos
		            FROM docentes
		            WHERE id_d = ${tokenDecoded.id};
		        `;
			}
			mysql.query(query)
		    .then( row => {
		    	if( row.length >= 1 ) {
		    		let data =  {
		    			"token": req.params.token,
		    			"nombres": row[0].nombres,
		    			"apellidos": row[0].apellidos
		    		};
		    		res.status(200).send(data);
		    	}
		    }).catch(error => {
		        res.status(401).send({"message": "Error, ingrese de nuevo"});
		    });
		},
		"post": (req, res) => {
			let userData = req.body;
			switch( userData.type ) {
				case "e":
					query = `
			            SELECT id_e as id,
			            	nombres_e as nombres,
				            apellidos_e as apellidos,
				            flag_e as flag
			            FROM estudiantes
			            WHERE user_e = '${userData.user}' AND pass_e = '${userData.pass}';
			        `;
					break;
				case "d":
					query = `
			            SELECT id_d as id,
			            	nombres_d as nombres,
				            apellidos_d as apellidos,
				            flag_d as flag
			            FROM docentes
			            WHERE user_d = '${userData.user}' AND pass_d = '${userData.pass}';
			        `;
					break;
				default:
					res.status(404).send({message: "Error, ingrese de nuevo"});
					break;
			}
		    mysql.query(query)
		    .then( row => {
		    	if( row.length >= 1 ) {
		    		let token = services.createToken( 
		    			{
		    				"id": row[0].id,
		    				"type": userData.type,
		    				"flag": row[0].flag,
		    			}, 
		    			{
		        			"time": 1,
		        			"type": "days"
		    			}
		    		);
		    		console.log(token);
		    		let data =  {
		    			"token": token,
		    			"nombres": row[0].nombres,
		    			"apellidos": row[0].apellidos
		    		};
		    		res.status(200).send(data);
		    	}
		    }).catch(error => {
		    	res.status(404).send(error);
		    });
		}
	}
}