<?php namespace Models;

	use Config\Conexion;
	use Config\GetSet;

	class Docentes extends GetSet {
		protected $id;
		protected $nombres;
		protected $apellidos;
		protected $cedula;
		protected $genero;

		protected $user;
		protected $pass;
		protected $flag;
		private $con;

		public function __construct() {
			$this->con = new Conexion();
		}

		public function conectado() {
			$sql = "
                SELECT id_d, nombres_d, apellidos_d, cedula_d, genero_d, user_d, flag_d
                FROM docentes
                WHERE user_d = '$this->user' AND
                pass_d = '$this->pass'
            ";

			$resp = $this->con->returnQuery( $sql );

			if( $resp->num_rows > 0 ) {
				$object = $resp->fetch_object();
				$json = array(
					"id"=>$object->id_d,
					"nombres"=>$object->nombres_d,
					"apellidos"=>$object->apellidos_d,
					"cedula"=>$object->cedula_d,
					"genero"=>$object->genero_d,
					"user"=>$object->user_d,
					"flag"=>$object->flag_d,
					"tipo"=>"docente",
					"val"=>true
				);
			}
			else
				$json = array(
					"val"=>false
				);
			return $json;
		}

		public function read() {
			$sql = "
				SELECT docentes.nombres_d as nombres,
				docentes.apellidos_d as apellidos,
				docentes.cedula_d as cedula,
				docentes.genero_d as genero,
				docentes.user_d as usuario
				FROM docentes
				WHERE docentes.id_d = " . $this->id . ";
			";

			$resultado = $this->con->returnQuery( $sql );

			$resp = (array) $resultado->fetch_object();

			return $resp;
		}

	}
?>