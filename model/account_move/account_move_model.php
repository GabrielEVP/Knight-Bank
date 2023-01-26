<?php

include_once ("account_move_class.php"); 
include_once (str_replace("account_move", "", __DIR__  . "database/query.php")); 
include_once (str_replace("account_move", "", __DIR__  . "function.php")); 

include_once (str_replace("account_move", "", __DIR__  . "move/move_model.php"));
include_once (str_replace("account_move", "", __DIR__  . "move_type/move_type_model.php")); 
include_once (str_replace("account_move", "", __DIR__  . "account/account_model.php")); 

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
        return insert("insert into account_move (id_account, id_move, amount) values ('" . $this->objAccount->getIdAccount() . "', " . $this->objMove->getIdMove(). ", $this->amount)");
    }

    public function delete_account_move () {
       return delete('account_move',$this->id_acccount_move);
    }

    public function update_account_move () {
        return update("update account_move set IBAN = '$this->IBAN', id_move = '$this->objAccount->getIBAN()', amount= $this->amount WHERE id_account_move = $this->id_acccount_move");
    }

    public function save_move () {
        $this->objMove->insert_move();
        $this->objMove = $this->objMove->get_last_move();     
        
        $this->insert_account_move();
    }

    public function save_transference($receiver_IBAN) {
        return update("CALL NEW_TRANSFERENCE($this->amount,'" . $this->objMove->getNotion() . "','" . $this->objAccount->getIBAN() . "','$receiver_IBAN')");
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DE LA BBDD
//------------------------------------------------------------------
    public function get_account_move ($id) {
       $select = select_Object("select * from account_move where id = $id");
       $account_move = cast_array($select, new account_move_model())[0];
       return $account_move;
    }

//------------------------------------------------------------------
//LISTAS
//------------------------------------------------------------------

public function get_moves_from_IBAN($IBAN,$options = array()) {
    $sql_where = "";
    $sql_where .= (isset($options['start_date']))? " AND m.dateTime >= '" . $options['start_date'] .  "' " : " " ;
    $sql_where .= (isset($options['end_date']))? " AND m.dateTime <= '" . $options['end_date'] .  "' " : " " ;
    $sql_where .= (isset($options['income']))? " AND am.amount > 0 " : " " ;
    $sql_where .= (isset($options['expenses']))? " AND am.amount < 0 " : " " ;

    $select = select_array("SELECT * FROM account_move am
                            INNER JOIN account a
                                ON a.id_account = am.id_account
                            INNER JOIN move m
                                ON am.id_move = m.id_move 
                            INNER JOIN move_type mt
                                ON m.id_moveType = mt.id_moveType             
                            WHERE 
                                a.IBAN = '" . $IBAN . "' 
                                $sql_where  
                            ORDER BY dateTime desc     
                                    ");

    $result = array();
    foreach ($select as $row) {
        $account = new account_model();
        $move = new move_model();
        $move_type = new move_type_model();
        $account_move = new account_move_model();

        $move_type->setName($row['name']);

        $move->setObjMoveType($move_type);

        $move->setDateTime($row['dateTime']);
        $move->setNotion($row['notion']);

        $account->setIBAN($IBAN);
        $account->setBalance($row['balance']);

        $account_move->setAmount($row['amount']);

        $account_move->objAccount = $account->getObjvars();
        $account_move->objMove = $move->get_move_and_move_type();

        array_push($result,get_object_vars($account_move));
    }
    return $result;
}
}

?>