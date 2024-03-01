<?php
class Rutas extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("rutas_model");
        header('Access-Control-Allow-Origin: *');
    }


    public function index()
    //controlador por defecto
    {
        echo 'acceso restringido';
    }


    public function get_rutas()
    /*controlador que obtiene todos 
    los registros de rutas*/
    {
        $r=$this->rutas_model->get_rutas();
        echo json_encode($r);
    }
    

    public function get_tramo()
    /*controlador que obtiene el registro 
    de una ruta y sus paradas con coordenadas*/
    {
        $clave_ruta=$this->input->post('clave_ruta');
        $r=$this->rutas_model->get_tramo($clave_ruta);
        echo json_encode($r);
    }

    public function insert_ruta()
    //inserta una nueva ruta, solo el nombre
    //para que la ruta tenga paradas, se hace en incert_tramo
    {
        $nombre=$this->input->post('nombre');
        $data=array(
            'nombre'=>$nombre
        );
        $r=$this->rutas_model->insert_ruta($data);
        echo json_encode($r);
    }


    public function insert_tramo()
    //inserta las paradas que hace una ruta
    {
        $clave_ruta=$this->input->post('clave_ruta');
        $clave_parada=$this->input->post('clave_parada');
        $data=array(
            'clave_ruta'=>$clave_ruta,
            'clave_parada'=>$clave_parada
        );
        $r=$this->rutas_model->insert_tramo($data);
        echo json_encode($r);
    }


    public function update_ruta()
    //actiualiza el nombre de una routa
    //ejemplo: ruta 7 cambia a ruta c21
    {
        $nombre=$this->input->post('nombre');
        $clave=$this->input->post('clave');
        $data=array(
            'clave'=>$clave,
            'nombre'=>$nombre
        );
        $r=$this->rutas_model->update_ruta($data);
        echo json_encode($r);
    }


    public function delete_ruta()
    //elimina una ruta por su clave
    {
        $clave=$this->input->post('clave');
        $r=$this->rutas_model->delete_ruta($clave);
        echo json_encode($r);
    }


    public function delete_tramo()
    //elimina parada de una ruta
    //otras palabras, elimina un tramo de una ruta
    {
        $clave_ruta=$this->input->post('clave_ruta');
        $clave_parada=$this->input->post('clave_parada');
        $data=array(
            'clave_ruta'=>$clave_ruta,
            'clave_parada'=>$clave_parada
        );
        $r=$this->rutas_model->delete_tramo($data);
        echo json_encode($r);
    }


    public function get_vehiculos()
    //obtiene el registro de todos los vehiculos
    {
        $r=$this->rutas_model->get_vehiculos();
        echo json_encode($r);
    }


    public function get_vehiculo()
    //obtiene el registro de un vehiculo segun su clave
    //para realizar cambios
    {
        $clave=$this->input->post('clave');
        $r=$this->rutas_model->get_vehiculo($clave);
        echo json_encode($r);
    }


    public function insert_vehiculo()
    //ingresa los datos de un nuevo vehiculo
    /*
    !!!IMPORTANTE!!!  ESTADO SOLO PUEDE SER:
    "activo" o "mantenimiento"
    */
    {
        $marca=$this->input->post('marca');
        $modelo=$this->input->post('modelo');
        $placa=$this->input->post('placa');
        $estado=$this->input->post('estado');//activo o mantenimiento
        $data=array(
            'marca'=>$marca,
            'modelo'=>$modelo,
            'placa'=>$placa,
            'estado'=>$estado
        );
        $r=$this->rutas_model->insert_vehiculo($data);
        echo json_encode($r);
    }


    public function update_vehiculo()
    //actualiza los dato de un nuevo vehiculo segun su clave
    //la clave no se debe actualizar
    /*
    !!!IMPORTANTE!!!  ESTADO SOLO PUEDE SER:
    -------"activo" o "mantenimiento"------
    */
    {
        $clave=$this->input->post('clave');
        $marca=$this->input->post('marca');
        $modelo=$this->input->post('modelo');
        $placa=$this->input->post('placa');
        $estado=$this->input->post('estado');//activo o mantenimiento
        $data=array(
            'clave'=>$clave,
            'marca'=>$marca,
            'modelo'=>$modelo,
            'placa'=>$placa,
            'estado'=>$estado
        );
        $r=$this->rutas_model->update_vehiculo($data);
        echo json_encode($r);
    }


    public function delete_vehiculo()
    //elimina un registro de cehiculo segun su clave
    {
        $clave=$this->input->post('clave');
        $r=$this->rutas_model->delete_vehiculo($clave);
        echo json_encode($r);
    }


    public function get_paradas()
    //obtiene todos los registros de paradas(con coordenadas)
    {
        $r=$this->rutas_model->get_paradas();
        echo json_encode($r);
    }


    public function insert_parada()
    //ingresa un nuevo registro a una parada
    {
        $nombre=$this->input->post('nombre');
        $latitud=$this->input->post('latitud');
        $longitud=$this->input->post('longitud');
        $data=array(
            'nombre'=>$nombre,
            'latitud'=>$latitud,
            'longitud'=>$longitud
        );
        $r=$this->rutas_model->insert_parada($data);
        echo json_encode($r);
    }

    
    public function update_parada()
    //esto solo actualiza el nombre de la parada
    //no se deben de actualizar coordenadas
    {
        $clave=$this->input->post('clave');
        $nombre=$this->input->post('nombre');
        $data=array(
            'nombre'=>$nombre
        );
        $r=$this->rutas_model->update_parada($clave,$data);
        echo json_encode($r);
    }


    public function delete_parada()
    //elimina el registro de una parada
    {
        $clave=$this->input->post('clave');
        $r=$this->rutas_model->delete_parada($clave);
        echo json_encode($r);
    }

}
?>