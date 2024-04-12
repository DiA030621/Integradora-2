<?php
class Empleados_model extends CI_Model
{
    public function get_empleados()
    //obtiene todos los registros de empleados y sus vehiculos
    {
        $rs=$this->db
        ->select('*')
        ->from('chofer')
        /*->select("c.*, v.")
        ->from("audita_chof a")
        ->join('chofer c', 'c.clave=a.clave_chofer')
        ->join('vehiculo v', 'v.clave=a.clave_vehiculo')*/
        ->get();
        return $rs->num_rows() > 0 ? $rs-> result() : null;
    }


    public function get_empleado($clave)
    //obtiene el registro de un empleado y su vehiculo
    {
        $rs=$this->db
        ->select("c.*, v.*")
        ->from("audita_chof a")
        ->join('chofer c', 'c.clave=a.clave_chofer')
        ->join('vehiculo v', 'v.clave=a.clave_vehiculo')
        ->where('c.clave', $clave)
        ->get();
        return $rs->num_rows() > 0 ? $rs-> result() : null;
    }


    public function insert_empleado($data)
    //ingresa un nuevo registro de chofer
    {
        $this->db->insert('chofer', $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }

    public function update_empleado($clave,$data)
    //actualiza los datos de un chofer
    {
        $this->db
        ->where('clave', $clave)
        ->update("chofer", $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }


    public function delete_empleado($clave)
    //elimina el registro de un chofer
    {
        $this->db
        ->where('clave', $clave)
        ->delete("chofer");
        $rs=$this->db->affected_rows();
        return $rs >0;
    }

    public function get_chofer_vehiculo($clave)
    {
        $rs=$this->db
        ->select("*")
        ->from("audita_chof")
        ->where('clave_chofer', $clave)
        ->get();
        return $rs->num_rows() > 0 ? $rs-> result() : null;
    }

    public function insert_chofer_vehiculo($data)
    //inserta un registro de chofer y su vehiculo 
    {
        $this->db->insert('audita_chof', $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }


    public function update_chofer_vehiculo($data)
    //se actualiza el vehiculo de un chofer
    {
        $this->db
        ->where('clave_chofer', $data['clave_chofer'])
        ->update("audita_chof", $data);
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }


    public function delete_chofer_vehiculo($clave_chofer)
    //elimina un registro de vehiculo chofer, segun la clave de chofer
    {
        $this->db
        ->where('clave_chofer', $clave_chofer)
        ->delete("audita_chof");
        $rs=$this->db->affected_rows();
        return $rs > 0;
    }

}
?>