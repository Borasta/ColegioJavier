<?php namespace Views;
require_once "../Models/Session.php";	use Models\Session;
require_once "../Models/Perfil.php";	use Models\Perfil;

$session = new Session();
$resp = $session->status();

$perfil = new Perfil();
$perfil->set("id", $resp["id"] );
$perfil->set("tipo", $resp["tipo"] );
$p = $perfil->verPerfil();
$p["val"] = true;
$p["tipo"] = $resp["tipo"];
echo json_encode( $p );

