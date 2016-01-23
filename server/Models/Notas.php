<?php namespace Models;
require_once "../Config/Conexion.php";	use Config\Conexion;
require_once "../Config/GetSet.php";	use Config\GetSet;

class Notas extends GetSet {
	protected $id;
	private $con;

	public function __construct() {
		$this->con = new Conexion();
	}

	public function verNotas() {
		$sql = "
			SELECT
				materias.nombre_m as Materias,
				docentes.nombres_d Nombres_Profesor,
				docentes.apellidos_d Apellidos_Profesor,
				notas.lapso1 as Lapso1,
				notas.lapso2 as Lapso2,
				notas.lapso3 as Lapso3,
				CAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as Promedio,
				anio.anio as 'Año Escolar'
			FROM estudiantes INNER JOIN cursos
				ON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia
				ON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes
				ON docente_materia.id_d = docentes.id_d INNER JOIN materias
				ON docente_materia.id_m = materias.id_m INNER JOIN notas
				ON cursos.id_c = notas.id_c             INNER JOIN anio
				ON notas.id_anio = anio.id_anio
			WHERE estudiantes.id_e = ". $this->id .";
		";

		$resultado = $this->con->returnQuery( $sql );

		while( $object = $resultado->fetch_object() ) {
			$array[] = $object;
		}

		return $array;

	}
}