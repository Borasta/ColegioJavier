<?php namespace Config;
    class GetSet {
        public function get( $atributo ) {
            return $this->$atributo;
        }

        public function set( $atributo, $contenido ) {
            $this->$atributo = $contenido;
        }
    }
?>
