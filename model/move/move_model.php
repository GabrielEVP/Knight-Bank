<?php

include_once ("move_class.php"); 
include_once (str_replace("move", "", __DIR__  . "database/query.php")); 
include_once (str_replace("move", "", __DIR__  . "function.php")); 

include_once (str_replace("move/", "", __DIR__  . "/move_type/move_type_model.php")); 
class move_model extends move_class {

    private $objMoveType;

    /**
     * Get the value of objMoveType
     */
    public function getObjMoveType()
    {
        return $this->objMoveType;
    }

    /**
     * Set the value of objMoveType
     */
    public function setObjMoveType($objMoveType): self
    {
        $this->objMoveType = $objMoveType;

        return $this;
    }

    public function get_move_and_move_type () {
        $this->objMoveType = $this->objMoveType->getObjvars();
        return get_object_vars($this);
    }
//------------------------------------------------------------------
//CRUD (SIN SELECT)
//------------------------------------------------------------------

    public function insert_move () {
        return insert("insert into move (id_moveType, dateTime, notion) values ('" . $this->objMoveType->getIdMoveType() . "', now(), '$this->notion')");
    }

    public function delete_move () {
       return delete('move',$this->id_move);
    }

    public function update_move () {
        return update("update move set id_moveType = '$this->objMoveType->getIdMoveType()', id_move = $this->id_move, dateTime = '$this->dateTime', notion = '$this->notion' WHERE id_move = $this->id_move");
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DE LA BBDD
//------------------------------------------------------------------
    public function get_move ($id) {
       $select = select_Object("select * from move where id = $id");
       $move = cast_array($select, new move_model())[0];
       return $move;
    }

    public function get_last_move() {
        $move = single_row_object_select("select * from move order by id_move desc limit 1",new move_model());
        //set_full_object($move);

        return $move;
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DE LA BBDD
//------------------------------------------------------------------


}

?>