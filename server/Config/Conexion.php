<?php namespace Config;
	// DECLARACION DE CLASE PARA CONEXION DE DATOS
	class Conexion {
		private $host ="db4free.net";
		private $user = "jhoseww";
		private $pass = "5603410jwm";
		private $db = "javier";

		private $cotejamiento = "utf8";

		private $con;

		function __construct() {
			$this->con = mysqli_connect( $this->host, $this->user, $this->pass, $this->db );
			$this->con->set_charset($this->cotejamiento);
		}

		function simpleQuery( $sql ) {
			$this->con->Query( $sql );
		}

		function returnQuery( $sql ) {
			return $this->con->Query( $sql );
		}

	}
?>