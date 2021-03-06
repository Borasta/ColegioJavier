module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			query = `
		            SELECT 
		            	id_r as id, 
		            	nombres_r as nombres, 
		            	apellidos_r as apellidos, 
		            	cedula_r as cedula, 
		            	genero_r as genero 
		            FROM representantes 
		            WHERE 
		            	upper(CONCAT(nombres_r, ' ', apellidos_r)) LIKE upper(?) OR
		            	cedula_r LIKE ? 
		            ORDER BY nombres_r;
		        `;
			var values = [
				`%${req.query.data}%`,
				`%${req.query.data}%`,
				`%${req.query.data}%`
			];
			mysql.query(query, values)
				 .then( representantes => {
					 console.log(representantes);
					 res.status(200).send(representantes);
				 }).catch(error => {
				res.status(404).send(error);
			});
		},
		"post": (req, res) => {
			query = `
		            INSERT INTO representantes VALUES ( 
			            null, 
			            '${req.body.nombres}', 
			            '${req.body.apellidos}', 
			            ${req.body.cedula}, 
			            '${req.body.genero}' 
		            );
		        `;
			mysql.query(query)
				 .then( s => {
					 res.status(200).send(s);
				 }).catch(error => {
				res.status(404).send(error);
			});
		},
		"put": (req, res) => {

			query = `
		            UPDATE representantes SET
			            nombres_r = '${req.query.nombres}', 
			            apellidos_r = '${req.query.apellidos}', 
			            cedula_r = ${req.query.cedula}, 
			            genero_r = '${req.query.genero}' 
		            WHERE id_r = ${req.query.id}
		            ;
		        `;
			mysql.query(query)
				 .then( s => {
					 res.status(200).send(s);
				 }).catch(error => {
				res.status(404).send(error);
			});
		},
		"delete": (req, res) => {
			query = `
		            DELETE FROM representantes WHERE id_r = ${req.query.id};
		        `;
			mysql.query(query)
				 .then( s => {
					 res.status(200).send(s);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}
	}
};