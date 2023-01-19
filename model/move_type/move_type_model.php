<?php

include_once ("move_type_class.php"); 
include_once ("model/database/query.php");
include_once ("model/function.php"); 

include_once ("model/move_type_type/move_type_type_model.php"); 
class move_type_model extends move_type_class {

    private $objmove_typeType;

    /**
     * Get the value of objmove_typeType
     */
    public function getObjmove_typeType()
    {
        return $this->objmove_typeType;
    }

    /**
     * Set the value of objmove_typeType
     */
    public function setObjmove_typeType($objmove_typeType): self
    {
        $this->objmove_typeType = $objmove_typeType;

        return $this;
    }
//------------------------------------------------------------------
//CRUD (SIN SELECT)
//------------------------------------------------------------------

    public function insert_move_type () {
        return insert("insert into move_type (name) values ('$this->name')");
    }

    public function delete_move_type () {
       return delete('move_type',$this->id_moveType);
    }

    public function update_move_type () {
        return update("update move_type set name='$this->name' WHERE id_moveType = $this->id_moveType");
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DE LA BBDD
//------------------------------------------------------------------
    public function get_move_type_by_id ($id) {
       $select = select_Object("select * from move_type where id = $id");
       $move_type = cast_array($select, new move_type_model())[0];
       return $move_type;
    }

    public function get_move_type_by_name () {
        return single_row_object_select("select * from move_type where name = '$this->name'",new move_type_model());
    }



}

?>