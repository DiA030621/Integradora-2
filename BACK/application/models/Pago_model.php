<?php
class Pago_model extends CI_Model
{
    public function insert_prepago($clave,$monto)
    /*llama a procedimiento de prepago con
    la clave de usuario y el monto ingresado*/
    {
        $sql = "CALL prepagoViaje(?, ?)";
        $param = array($clave, $monto);
        $this->db->query($sql, $param);

    }
    public function insert_pago($clave_usu, $clave_vehi)
    /*llama a procedimiento para pago en el camion
    con la clave de usuario y la clave del vehiculo*/
    {
        $sql = "CALL pagoCamion(?, ?)";
        $param = array($clave_usu, $clave_vehi);
        $this->db->query($sql, $param);
    }
}
?>