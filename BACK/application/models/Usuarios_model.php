<?php
class Usuarios_model extends CI_Model
{
    public function get_usuarios()
    //obtiene todos los registros de usuarios
    {
        $rs=$this->db
        ->select("*")
        ->from("usuario")
        ->get();
        return $rs->num_rows() > 0 ? $rs-> result() : null;
    }


    public function get_usuario($clave)
    //obtiene el registro de un usuario con su clave
    {
        $rs=$this->db
        ->select("*")
        ->from("usuario")
        ->where('clave', $clave)
        ->get();
        return $rs->num_rows() > 0 ? $rs-> result() : null;
    }

    
    public function insert_usuario($data)
    //inserta un registro de un usuario
    {
        $this->db->insert('usuario', $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }


    public function update_usuario($data)
    //actualiza el registro de un usuario segun su clave
    {
        $this->db
        ->where('clave', $data['clave'])
        ->update("usuario", $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }


    public function delete_usuario($clave)
    //elimina un regisrto de un usuario segun su clave
    {
        $this->db
        ->where('clave', $clave)
        ->delete("usuario");
        $rs=$this->db->affected_rows();
        return $rs >0;
    }


    public function get_sesion($correo, $contra)
    //obtiene el registro de un usuario con correo y contraseña
    {
        $rs=$this->db
        ->select("*")
        ->from("usuario")
        ->where('correo', $correo)
        ->where('contra', $contra)
        ->get();
        return $rs->num_rows() > 0 ? $rs-> result() : null;
    }
    

    public function insert_usuario_parada($data)
    //ingresa la parada donde el usuario se baja
    {
        $this->db->insert('usuario_parada', $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }
}
?>