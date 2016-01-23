<?php namespace Models;
require_once "../Config/Conexion.php";	use Config\Conexion;
require_once "../Config/GetSet.php";	use Config\GetSet;

class Grupos extends GetSet {
	protected $id;
	protected $tipo;
	private $con;

	public function __construct() {
		$this->con = new Conexion();
	}

	public function verGrupos() {
		if( $this->tipo == "estudiante" )
			$sql = "
				SELECT grupos.nombre_gru, grupos.descripcion_gru
				FROM estudiantes INNER JOIN miembros
					ON estudiantes.id_e = miembros.id_e INNER JOIN grupos
					ON miembros.id_gru = grupos.id_gru
				WHERE estudiantes.id_e = " . $this->id . ";
			";
		else if( $this->tipo == "docente" )
			$sql = "
				SELECT grupos.nombre_gru, grupos.descripcion_gru
				FROM docentes INNER JOIN lideres
					ON docentes.id_d = lideres.id_d INNER JOIN grupos
					ON lideres.id_gru = grupos.id_gru
				WHERE docentes.id_d = " . $this->id . ";
			";

		$resultado = $this->con->returnQuery( $sql );

		while( $object = $resultado->fetch_object() ) {
			$array[] = $object;
		}

		return $array;

	}
}