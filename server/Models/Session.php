<?php namespace Models;
require_once "../Config/GetSet.php";    use Config\GetSet;
require_once "Docentes.php";
require_once "Representantes.php";
require_once "Estudiantes.php";

class Session extends GetSet {
    protected $user;
    protected $pass;
    protected $tipo;

    public function __construct() {
        if(!isset($_SESSION))
            session_start();
    }

    public function status() {;
        $respuesta = array( "val"=>false );

        if( isset($_SESSION['user']) && isset($_SESSION['pass']) && isset($_SESSION['tipo']) ) {
            $this->user = $_SESSION['user'];
            $this->pass = $_SESSION['pass'];
            $this->tipo = $_SESSION['tipo'];


            $usuario = $this->tipo == 'estudiante' ? new Estudiantes() : new Docentes();
            $usuario->set('user', $this->user);
            $usuario->set('pass', $this->pass);

            $respuesta = $usuario->conectado();
        }

        return $respuesta;
    }

    public function create() {
        $_SESSION['user'] = $this->user;
        $_SESSION['pass'] = $this->pass;
        $_SESSION['tipo'] = $this->tipo;

        return $this->status();

    }

    public function desconectar() {
        $_SESSION['user'] = "";
        $_SESSION['pass'] = "";
        $_SESSION['tipo'] = "";
    }
}