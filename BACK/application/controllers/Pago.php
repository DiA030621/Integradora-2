<?php
class Pago extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("pago_model");
        header('Access-Control-Allow-Origin: *');
    }


    public function insert_prepago()
    //se ingresa el prepago
    //se requiere clave de usuario y el monto ingresado.
    {
        $clave=$this->input->post('clave');
        $monto=$this->input->post('monto');
        $r=$this->pago_model->insert_prepago($clave,$monto);
        echo json_encode($r);
        /*$obj["mensaje"] = $r==null ?
            "Se realizo correctamente la venta" : 
            "No se realizo la venta correctamente";
        echo json_encode($obj);*/

        /*try {
            $r = $this->pago_model->insert_prepago($clave, $monto);
            $obj["mensaje"] = "Se realizó correctamente la venta";
        } catch (PDOException $e) {
            $obj["mensaje"] = "Error en la base de datos: " . $e->getMessage();
        }
        echo json_encode($obj);*/
    }


    public function insert_pago()
    //ingresa el pago al subirte al camion
    //si se realiza correctamente devuelve un true
    //se requiere clave de usuario y clave de vehiculo
    /*si no devuelve nada o null
    es porque no tiene saldo suficiente o
    realizo un pago en el mismo vehiculo en menos de 5 minutos*/
    {
        $clave_usu=$this->input->post('clave_usu');
        $clave_vehi=$this->input->post('clave_vehi');
        $r=$this->pago_model->insert_pago($clave_usu, $clave_vehi);
        echo json_encode($r);
    }
}
?>