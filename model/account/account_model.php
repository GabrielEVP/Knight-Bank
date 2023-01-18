<?php

include_once ("account_class.php"); 
include_once (str_replace("account", "", __DIR__  . "database/query.php")); 
include_once (str_replace("account", "", __DIR__  . "function.php")); 

class account_model extends account_class {

    private $objUser;

        /**
     * Get the value of objUser
     */
    public function getObjUser()
    {
        return $this->objUser;
    }

    /**
     * Set the value of objUser
     */
    public function setObjUser($objUser): self
    {
        $this->objUser = $objUser;

        return $this;
    }

//------------------------------------------------------------------
//CRUD (SIN SELECT)
//------------------------------------------------------------------
    public function insert_account () {
        $id_user = $this->objUser->getIdUser();
        return insert("insert into account (IBAN, balance, id_user, active) values ('$this->IBAN', 0, '$id_user', 1)");
    }

    public function delete_account () {
       return delete('account',$this->id_account,'id_account');
    }

    public function update_account () {
        return update("update account set balance = $this->balance, id_user = $this->id_user, id_user_hist= $this->id_user_hist, active = $this->active WHERE id_account = $this->'id_account'");
    }

    public function update_balance ($amount) {
        return update("update account set balance = balance + $amount WHERE id_account = $this->'id_account'");
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DESDE LA BBDD
//------------------------------------------------------------------
    public function get_account () {
       $select = select_Object("select * from account where id_account = $this->id_account");
       $account = cast_array($select, new account_model())[0];
       return $account;
    }

    public function check_IBAN_available() {
        $select = single_row_array_select("SELECT IBAN FROM account WHERE IBAN = '$this->IBAN'");
        if (empty($select)) {
            return true;
        } else {
            return false;
        }
    }

    public function check_account_ownership () {
        $select = single_row_array_select("SELECT id_user FROM account WHERE IBAN = '$this->IBAN'");
        if (!empty($select) && $this->objUser->getIdUser() == $select['id_user']) {
            return true;
        } else {
            return false;
        }

    }
//------------------------------------------------------------------
//MANIPULACION DEL OBJETO (SIN BBDD)
//------------------------------------------------------------------

    public function generate_new_IBAN() {
        $new_IBAN = "ES912100041845"; //base del IBAN, en españa (ES91) con la numeracion de BBVA (2100) en la oficina 0418 y con el codigo de control 45
        $IBAN_completed = false;
        while ($IBAN_completed == false) {
            for ($i = 0; $i < 10; $i++) {
                $new_IBAN .= random_int(0,9);
            }
            $this->IBAN = $new_IBAN;
            $IBAN_completed = $this->check_IBAN_available();
        }
    }

}

?>