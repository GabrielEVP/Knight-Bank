<?php

include_once ("account_class.php"); 
include_once (str_replace("account", "", __DIR__  . "database\query.php")); 
include_once (str_replace("account", "", __DIR__  . "function.php")); 

class account_model extends account_class {

    public function insert_account () {
        return insert("insert into account (IBAN, balance, id_user, id_user_hist,active) values ('$this->IBAN', 0, $this->id_user, $this->id_user_hist, 1)");
    }

    public function delete_account () {
       return delete('account',$this->IBAN,'IBAN');
    }

    public function update_account () {
        return update("update account set balance = $this->balance, id_user = $this->id_user, id_user_hist= $this->id_user_hist, active = $this->active WHERE IBAN = $this->'IBAN'");
    }

    public function get_account () {
       $select = select_Object("select * from account where IBAN = $this->IBAN");
       $account = cast_array($select, new account_model())[0];
       return $account;
    }


}

?>