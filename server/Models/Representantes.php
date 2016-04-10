<?php namespace Models;

	// AGRUPACION DE VARIABLES

	use Config\Conexion;
	use Config\GetSet;

	class Representantes extends GetSet {

		protected $id;
		protected $nombres;
		protected $apellidos;
		protected $cedula;
		protected $genero;
		private $con; // VARIABLE DECLARADA PARA CONEXION CON BASE DE DATOS 

		public function __construct() {
			$this->con = new Conexion();
		}

		public function create() {
			$sql = "
				INSERT INTO representantes VALUES(
				null,
				'$this->nombres',
				'$this->apellidos',
				'$this->cedula',
				'$this->genero'
			)";
			$this->con->simpleQuery( $sql );
		}

		public function read() {
			$sql = "
				SELECT representantes.nombres_r as nombres,
				representantes.apellidos_r as apellidos,
				representantes.cedula_r as cedula,
				representantes.genero_r as genero
				FROM estudiantes                          INNER JOIN familias
					ON estudiantes.id_e = familias.id_e   INNER JOIN representantes
					ON familias.id_r = representantes.id_r
				WHERE estudiantes.id_e = " . $this->id . ";
			";

			$resultado = $this->con->returnQuery( $sql );

			while( $object = $resultado->fetch_object() ) {
				$array[] = $object;
			}

			return $array;
		}

		public function update() {

		}

		public function delete() {

		}

		public function show() {
			$sql = "
                SELECT *
                FROM representantes
            ";
			$this->con->simpleQuery( $sql );
		}
	}
