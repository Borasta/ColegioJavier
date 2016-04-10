<?php namespace Models;
	include_once "../Config/Conexion.php";
	include_once "../Config/GetSet.php";
	use Config\Conexion;
	use Config\GetSet;

	class Usuarios extends GetSet {

		protected $id_u;
		protected $user;
		protected $pass;
		protected $flag;
		private $con; // VARIABLE DECLARADA PARA CONEXION CON BASE DE DATOS

		public function __construct() {
			$this->con = new Conexion();
		}

		public function create() {
			$sql = "
				INSERT INTO usuarios
				VALUES(
					null,
					'$this->id_u',
					'$this->user',
					'$this->pass',
					'$this->flag'
				)
			";
			$this->con->simpleQuery( $sql );
		}

		public function read() {
			$sql = "
				SELECT *
				FROM usuarios
				WHERE user = '$this->user'
				AND pass = '$this->pass'
			";
			$resultado = $this->con->returnQuery( $sql );
			return $resultado;
		}

		public function update() {

		}

		public function delete() {

		}

		public function show() {
			$sql = "
					SELECT *
					FROM usuarios
				";
			$this->con->simpleQuery( $sql );
		}
	}
?>