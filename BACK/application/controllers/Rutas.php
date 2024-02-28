<?php
class Carrito extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
    }
    public function index()
    {
        echo 'acceso restringido';
    }
}
?>