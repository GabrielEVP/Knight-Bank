<?php

include_once ("account_move_class.php"); 
include_once ("model/database/query.php");
include_once ("model/function.php"); 

include_once ("model/move/move_model.php"); 
include_once ("model/account/account_model.php"); 
class account_move_model extends account_move_class {

    private $objMove;
    private $objAccount;


    public function getObjMove()
    {
        return $this->objMove;
    }


    public function setObjMove($objMove): self
    {
        $this->objMove = $objMove;

        return $this;
    }

            /**
     * Get the value of objUser
     */
    public function getObjAccount()
    {
        return $this->objAccount;
    }

    /**
     * Set the value of objUser
     */
    public function setObjAccount($objAccount): self
    {
        $this->objAccount = $objAccount;

        return $this;
    }

//------------------------------------------------------------------
//CRUD (SIN SELECT)
//------------------------------------------------------------------

    public function insert_account_move () {
        return insert("insert into account_move (IBAN, id_move, amount) values ('$this->objAccount->getIBAN()', $this->objMove->getIdMove(), $this->amount)");
    }

    public function delete_account_move () {
       return delete('account_move',$this->id_acccount_move);
    }

    public function update_account_move () {
        return update("update account_move set IBAN = '$this->IBAN', id_move = '$this->objAccount->getIBAN()', amount= $this->amount WHERE id_account_move = $this->id_acccount_move");
    }

    public function save_move () {
        $this->objMove->insert();
        $this->objMove = $this->objMove->get_last_move();     
        
        $this->insert_account_move();
    }

    public function save_transference($receiver_IBAN) {
        return update("CALL NEW_TRANSFERENCE($this->amount,'$this->objMove->getNotion()','$this->IBAN','$receiver_IBAN')");
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DE LA BBDD
//------------------------------------------------------------------
    public function get_account_move ($id) {
       $select = select_Object("select * from account_move where id = $id");
       $account_move = cast_array($select, new account_move_model())[0];
       return $account_move;
    }
    
    public function get_moves_from_account() {
        $select = select_array("SELECT * FROM account_move am
                                INNER JOIN account a
                                    ON a.id_account = am.id_account
                                INNER JOIN move m
                                    ON am.id_move = m.id_move        
                                WHERE 
                                    a.IBAN = '" . $this->objAccount->getIBAN() . "'        
                                        ");

        foreach ($select as $row) {
            $account = new account_model();
            $move = new move_model();
            
        }
    }
}

?>