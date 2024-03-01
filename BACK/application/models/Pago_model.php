<?php
class Pago_model extends CI_Model
{
    public function insert_prepago($clave,$monto)
    /*llama a procedimiento de prepago con
    la clave de usuario y el monto ingresado*/
    {
        $sql = "CALL prepagoViaje(?, ?)";
        $param = array($clave, $monto);
        //$this->db->query($sql, $param);
        try {
            $this->db->query($sql, $param);
            return true;
        }catch (Exception $e) {
            // Si se produce un error en la base de datos, lanza una excepción con un mensaje de error
            //throw new Exception("Error en la base de datos: " . $e->getMessage());
            return false;
        }
        
    }


    
    public function insert_pago($clave_usu, $clave_vehi)
    /*llama a procedimiento para pago en el camion
    con la clave de usuario y la clave del vehiculo*/
    {
        /*
        $sql = "CALL pagoCamion(?, ?)";
        $param = array($clave_usu, $clave_vehi);
        $this->db->query($sql, $param);
        *//*
        $query = "CALL pagoCamion($clave_usu, $clave_vehi)";
        $rs=$this->db->query($query);
        return $rs->affected_rows() > 0 ? true:false;*/
        $sql = "CALL pagoCamion(?, ?)";
        $param = array($clave_usu, $clave_vehi);
        try {
            $this->db->query($sql, $param);
            return true;
        }catch (Exception $e) {
            // Si se produce un error en la base de datos, lanza una excepción con un mensaje de error
            //throw new Exception("Error en la base de datos: " . $e->getMessage());
            return false;
        }
    }
}
?>