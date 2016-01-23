<?php
	require_once "../Models/Session.php";
	use Models\Session;

	$json = json_decode( $_POST["json"] );

	$session = new Session();

	$session->set("user", $json->user );
	$session->set("pass", $json->pass );
	$session->set("tipo", $json->tipo );

	echo json_encode( $session->create() );
?>