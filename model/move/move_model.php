<?php

include_once ("move_class.php"); 
include_once ("model/database/query.php");
include_once ("model/function.php"); 

include_once ("model/move_type/move_type_model.php"); 
class move_model extends move_class {

    private $objMoveType;

    public function insert_move () {
        return insert("insert into move (id_moveType, dateTime) values ($this->objMoveType->getIdMoveType(), '$this->dateTime')");
    }

    public function delete_move () {
       return delete('move',$this->id);
    }

    public function update_move () {
        return update("update move set IBAN = '$this->IBAN', id_move = $this->id_move, amount= $this->amount WHERE id_move = $this->id_move");
    }

    public function get_move ($id) {
       $select = select_Object("select * from move where id = $id");
       $move = cast_array($select, new move_model())[0];
       return $move;
    }

}

?>