<?php
class Usuarios extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("usuarios_model");
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
    }


    public function acceso()
    /*controlador que devuelve el tipo de usuario
    (admin, clie), pero si no coincide devuelve
    NULL   */
    {
        $correo=$this->input->post('correo');
        $contra=$this->input->post('contra');
        $r=$this->usuarios_model->get_sesion($correo,$contra);
        $obj["resultado"] = $r != NULL;
        $obj["mensaje"] = $obj["resultado"] ? 
            count($r)." usuario recuperado" : "El correo o contraseña no coinciden";
        $obj["usuario"] = $r;
        

        echo json_encode($obj);
    }


    public function get_usuarios()
    //cotrolador que obtiene todos los registros de usuarios tipo cliente para su administración
    {
        $r=$this->usuarios_model->get_usuarios();
        echo json_encode($r);
    }


    public function get_usuario()
    /*controlador que obtiene el registro de un usuario para realizar cambios en su cuenta,
    si no coincide, regresara null*/
    {
        $clave=$this->input->post('clave');
        $r=$this->usuarios_model->get_usuario($clave);
        echo json_encode($r);
    }


    public function insert_usuario()
    //controlador para el registro de un nuevo usuario cliente
    {
        $nombre=$this->input->post('nombre');
        $ap=$this->input->post('ap');
        $am=$this->input->post('am');
        $correo=$this->input->post('correo');
        $contra=$this->input->post('contra');
        $data=array(
            'nombre'=>$nombre,
            'ap'=>$ap,
            'am'=>$am,
            'correo'=>$correo,
            'contra'=>$contra
        );
        $r=$this->usuarios_model->insert_usuario($data);
        echo json_encode($r);
    }


    public function update_usuario()
    //controlador para actualizar los datos de un usuario cualquiera
    //IMPORTANTE!!!,  NO SE DEBE ACTUALIZAR LA CLAVE!!!
    //la clave solo sirve para localizar el registro que se actualiza
    {
        $clave=$this->input->post('clave');
        $nombre=$this->input->post('nombre');
        $ap=$this->input->post('ap');
        $am=$this->input->post('am');
        $correo=$this->input->post('correo');
        $contra=$this->input->post('contra');
        $tipo=$this->input->post('tipo');
        $saldo=$this->input->post('saldo');
        $data=array(
            'clave'=>$clave,
            'nombre'=>$nombre,
            'ap'=>$ap,
            'am'=>$am,
            'correo'=>$correo,
            'contra'=>$contra,
            'tipo'=>$tipo,
            'saldo'=>$saldo
        );
        $r=$this->usuarios_model->update_usuario($data);
        echo json_encode($r);
    }


    public function delete_usuario()
    //elimina el registro de un usuario segun su clave
    {
        $clave=$this->input->post('clave');
        $r=$this->usuarios_model->delete_usuario($clave);
        echo json_encode($r);
    }


    public function insert_usuario_parada()
    //inserta una nueva parada para en donde el usuario se baja
    {
        $clave_usuario=$this->input->post('clave_usuario');
        $clave_tramo=$this->input->post('clave_tramo');
        $data=array(
            'clave_usuario'=>$clave_usuario,
            'clave_tramo'=>$clave_tramo
        );
        $r=$this->usuarios_model->insert_usuario_parada($data);
        echo json_encode($r);
    }
}
?>