<?php namespace Models;

require_once "../Config/GetSet.php";

use Config\GetSet;

class Perfil extends GetSet {
	protected $id;
	protected $tipo;

	public function verPerfil() {
		$json = "";

		if( $this->tipo == "estudiante" ) {
			$e = new Estudiantes();
			$e->set( "id", $this->id );

			$data_est = $e->read();

			$r = new Representantes();
			$r->set( "id", $this->id );

			$data_rep = $r->read();

			$json = array( "estudiante" => $data_est, "representantes" => $data_rep );
		}
		else if( $this->tipo == "docente" ) {
			$d = new Docentes();

			$d->set( "id", $this->id );

			$json = $d->read();
		}
		return $json;
	}

}

?>