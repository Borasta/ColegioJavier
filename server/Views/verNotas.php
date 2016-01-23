<?php namespace Views;
require_once "../Models/Notas.php";		use Models\Notas;
require_once "../Models/Session.php";	use Models\Session;

$session = new Session();
$resp = $session->status();

$notas = new Notas();
$notas->set("id", $resp["id"] );
$n = $notas->verNotas();
$n["val"] = true;
echo json_encode( $n );

