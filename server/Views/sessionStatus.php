<?php namespace Views;
//	use Models\Usuarios;
	use Models\Session;
//
//	$json = json_decode( $_POST["JSession"] );
//
	require_once "../Models/Session.php";
//	$respuesta = array( "val"=>false );
//
//	$usuario = new Usuarios();
//
//	foreach( $json as $key => $val ) {
//		$usuario->set( $key, $val );
//	}
//
//	$query = $usuario->read();
//
//	if( $query->num_rows == 1 ) {
//		$respuesta = $query->fetch_object();
//		$respuesta->val = true;
//		unset( $respuesta->pass );
//		$query->free_result();
//		unset($resp);
//	}
//
//	echo json_encode( $respuesta );

	$session = new Session();
	echo json_encode( $session->status() );

?>