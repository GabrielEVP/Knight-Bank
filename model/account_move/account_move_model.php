<?php

include_once ("account_move_class.php"); 
include_once ("model/database/query.php");
include_once ("model/function.php"); 

class account_move_model extends account_move_class {

    private $objMove;
    private $objAccount;

    public function insert_account_move () {
        return insert("insert into account_move (IBAN, id_move, amount) values ('$this->objAccount->getIBAN()', $this->objMove->getIdMove(), $this->amount)");
    }

    public function delete_account_move () {
       return delete('account_move',$this->id);
    }

    public function update_account_move () {
        return update("update account_move set IBAN = '$this->IBAN', id_move = $this->id_move, amount= $this->amount WHERE id_account_move = $this->id_account_move");
    }

    public function get_account_move ($id) {
       $select = select_Object("select * from account_move where id = $id");
       $account_move = cast_array($select, new account_move_model())[0];
       return $account_move;
    }

}

?>