<?php
	// DECLARACION DE CLASE PARA CONEXION DE DATOS
	class Conexion {

		private $host = "";
		private $user = "root"; 
		private $pass = "";
		private $db = "colegio";
		private $con;
		
		function __construct() {
			$this->con = new mysqli_connect( $host, $user, $pass, $db );
		}

		function simpleQuery( $sql ) {
			$this->con->Query( $sql );
		}

		function returnQuery( $sql ) {
			return $this->con->Query( $sql );
		}

	}

?>