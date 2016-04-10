<?php namespace Views;
	require_once "../Models/Grupos.php";	use Models\Grupos;
	require_once "../Models/Session.php";	use Models\Session;

	$session = new Session();
	$resp = $session->status();

	$grupos = new Grupos();
	$grupos->set("id", $resp["id"] );
	$grupos->set("tipo", $resp["tipo"] );
	$g = $grupos->verGrupos();
	$g["val"] = true;
	echo json_encode( $g );

