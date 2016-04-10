<?php namespace Models;

require_once "../Config/Conexion.php";
require_once "../Config/GetSet.php";

use Config\Conexion;
use Config\GetSet;

class Horario extends GetSet {
	protected $id;
	protected $tipo;
	protected $con;

	public function __construct() {
		$this->con = new Conexion();
	}

	public function verHorario() {
		$sql = "";
		if( $this->tipo == "estudiante" )
			$sql = "
				SELECT docentes.nombres_d, materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final
				FROM estudiantes
				  INNER JOIN cursos
					ON estudiantes.id_e = cursos.id_e
				  INNER JOIN docente_materia
					ON cursos.id_dm = docente_materia.id_dm
				  INNER JOIN docentes
					ON docente_materia.id_d = docentes.id_d
				  INNER JOIN materias
					ON docente_materia.id_m = materias.id_m
				  INNER JOIN horarios
					ON docente_materia.id_dm = horarios.id_dm
				  INNER JOIN dias
					ON horarios.id_dia = dias.id_dia
				  INNER JOIN notas
					ON cursos.id_c = notas.id_c
				WHERE estudiantes.id_e = ".$this->id." AND (SELECT count(*) FROM anio) = notas.id_anio
				ORDER BY dias.id_dia, horarios.id_h;
			";
		else if( $this->tipo == "docente" ) {
			$sql = "
				SELECT materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final
				FROM docentes INNER JOIN docente_materia
					ON docentes.id_d = docente_materia.id_d
				  INNER JOIN materias
					ON docente_materia.id_m = materias.id_m
				  INNER JOIN horarios
					ON docente_materia.id_dm = horarios.id_dm
				  INNER JOIN dias
					ON horarios.id_dia = dias.id_dia
				WHERE docentes.id_d = ".$this->id."
				ORDER BY dias.id_dia, horarios.id_h;
			";
		}

		$resp = $this->con->returnQuery( $sql );

		$json = array( "val"=>false );

		while( $object = $resp->fetch_object() ) {
			switch( $object->dia ) {
				case "Lunes":
					$horario["lunes"][] = $object;
					break;
				case "Martes":
					$horario["martes"][] = $object;
					break;
				case "Miercoles":
					$horario["miercoles"][] = $object;
					break;
				case "Jueves":
					$horario["jueves"][] = $object;
					break;
				case "Viernes":
					$horario["viernes"][] = $object;
					break;
			}
		}
		return $horario;
	}

}

?>