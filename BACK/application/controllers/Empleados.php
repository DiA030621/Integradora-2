<?php
class Empleados extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("empleados_model");
        header('Access-Control-Allow-Origin: *');
    }


    public function get_empleados()
    /*obtiene todos los registros 
    de los empleados y su vehiculo asignado*/
    {
        $r=$this->empleados_model->get_empleados();
        echo json_encode($r);
    }


    public function get_empleado()
    //obtiene el registro de un empleado con su clave
    //incluye los datos de su vehiculo asignado
    {
        $clave=$this->input->post('clave');
        $r=$this->empleados_model->get_empleado($clave);
        echo json_encode($r);
    }


    public function insert_empleado()
    //ingresa un nuevo registro de choferes
    {
        $nombre=$this->input->post('nombre');
        $ap=$this->input->post('ap');
        $am=$this->input->post('am');
        $data=array(
            'nombre'=>$nombre,
            'ap'=>$ap,
            'am'=>$am
        );
        $r=$this->empleados_model->insert_empleado($data);
        echo json_encode($r);
    }


    public function update_empleado()
    //actualiza cambios en los datos del chofer segun su clave
    {
        $clave=$this->input->post('clave');
        $nombre=$this->input->post('nombre');
        $ap=$this->input->post('ap');
        $am=$this->input->post('am');
        $data=array(
            'nombre'=>$nombre,
            'ap'=>$ap,
            'am'=>$am
        );
        $r=$this->empleados_model->update_empleado($clave,$data);
        echo json_encode($r);
    }


    public function delete_empleado()
    //elimina el registro de un chofer segun su clave
    {
        $clave=$this->input->post('clave');
        $r=$this->empleados_model->delete_empleado($clave);
        echo json_encode($r);
    }


    public function insert_chofer_vehiculo()
    //asigna un chofer a un vehiculo
    {
        $clave_chofer=$this->input->post('clave_chofer');
        $clave_vehiculo=$this->input->post('clave_vehiculo');
        $data=array(
            'clave_chofer'=>$clave_chofer,
            'clave_vehiculo'=>$clave_vehiculo
        );
        $r=$this->empleados_model->insert_chofer_vehiculo($data);
        echo json_encode($r);
    }


    public function update_chofer_vehiculo()
    //se asigna un vehiculo diferente a un chofer usando la clave del chofer
    {
        $clave_chofer=$this->input->post('clave_chofer');
        $clave_vehiculo_nuevo=$this->input->post('clave_vehiculo_nuevo');
        $data=array(
            'clave_chofer'=>$clave_chofer,
            'clave_vehiculo'=>$clave_vehiculo_nuevo
        );
        $r=$this->empleados_model->update_chofer_vehiculo($data);
        echo json_encode($r);
    }
    public function delete_chofer_vehiculo()
    //se asigna un vehiculo diferente a un chofer usando la clave del chofer
    {
        $clave_chofer=$this->input->post('clave_chofer');
        $r=$this->empleados_model->delete_chofer_vehiculo($clave_chofer);
        echo json_encode($r);
    }
}
?>