<?php namespace Models;
require_once "../Config/Conexion.php";  use Config\Conexion;
require_once "../Config/GetSet.php";	use Config\GetSet;

class Estudiantes extends GetSet {
    protected $id;
    protected $nombres;
    protected $apellidos;
    protected $cedula;
    protected $fecha_nacimiento;
    protected $genero;

    protected $user;
    protected $pass;
    protected $flag;
    private $con;

    public function __construct() {
        $this->con = new Conexion();
    }

    public function create() {
        $sql = "
            INSERT INTO estudiantes VALUES(
            null,
            '$this->nombres',
            '$this->apellidos',
            '$this->cedula',
            '$this->fecha_nacimiento',
            '$this->genero'
        )";
        $this->con->simpleQuery( $sql );
    }

    public function read() {
        $sql = "
            SELECT estudiantes.nombres_e as nombres,
            estudiantes.apellidos_e as apellidos,
            estudiantes.fecha_nacimiento as edad,
            estudiantes.cedula_e as cedula,
            estudiantes.genero_e as genero,
            estudiantes.direccion_e as direccion,
            estudiantes.user_e as usuario,
            grados.grado as grado,
            secciones.seccion as seccion
            FROM estudiantes                          INNER JOIN grados
                ON estudiantes.id_gra = grados.id_gra INNER JOIN secciones
                ON grados.id_s = secciones.id_s
            WHERE estudiantes.id_e = " . $this->id . ";
        ";
        $resp = $this->con->returnQuery( $sql );

        return $resp->fetch_object();
    }

    public function update() {

    }

    public function delete() {

    }

    public function show() {
        $sql = "
            SELECT *
            FROM estudiantes

        ";
        $this->con->returnQuery( $sql );
    }

    public function conectado() {
        $sql = "
            SELECT id_e,
            nombres_e,
            apellidos_e,
            cedula_e,
            fecha_nacimiento,
            genero_e,
            direccion_e,
            user_e,
            flag_e
            FROM estudiantes
            WHERE user_e = '$this->user' AND
            pass_e = '$this->pass'
        ";
        $resp = $this->con->returnQuery( $sql );

        $json = array(
            "val"=>false
        );

        if( $resp->num_rows > 0 ) {
            $object = $resp->fetch_object();
            $json = array(
                "id"=>$object->id_e,
                "nombres"=>$object->nombres_e,
                "apellidos"=>$object->apellidos_e,
                "cedula"=>$object->cedula_e,
                "fecha_nacimiento"=>$object->fecha_nacimiento,
                "genero"=>$object->genero_e,
                "direccion"=>$object->direccion_e,
                "user"=>$object->user_e,
                "flag"=>$object->flag_e,
                "tipo"=>"estudiante",
                "val"=>true
            );
        }
        return $json;
    }
}