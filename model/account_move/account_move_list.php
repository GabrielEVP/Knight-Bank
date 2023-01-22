<?php 
include_once ("account_move_model.php"); 
include_once (str_replace("account_move", "", __DIR__  . "database/query.php")); 
include_once (str_replace("account_move", "", __DIR__  . "function.php")); 
include_once (str_replace("account_move", "", __DIR__  . "standard_class.php")); 
class account_move_list extends standard_class{

    private $account_move_list;

        /**
     * Get the value of account_move_list
     */
    public function getAccountMoveList()
    {
        return $this->account_move_list;
    }

    /**
     * Set the value of account_move_list
     */
    public function setAccountMoveList($account_move_list): self
    {
        $this->account_move_list = $account_move_list;

        return $this;
    }
    //------------------------------------------------------------------
    //BUSQUEDAS EN LA BBDD
    //------------------------------------------------------------------

    public function get_moves_from_IBAN($IBAN,$options = array()) {
        $sql_where = "";
        $sql_where .= (isset($options['start_date']))? " AND m.dateTime >= '" . $options['start_date'] .  "' " : " " ;
        $sql_where .= (isset($options['end_date']))? " AND m.dateTime <= '" . $options['start_date'] .  "' " : " " ;
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
                                        ");

        $result = array();
        foreach ($select as $row) {
            $account = new account_model();
            $move = new move_model();
            $move_type = new move_type_model();
            $account_move = new account_move_model();

            $move_type->setName($row['mt.name']);

            $move->setObjMoveType($move_type);

            $move->setDateTime($row['m.dateTime']);
            $move->setNotion($row['m.notion']);

            $account->setIBAN($row["a.Iban"]);
            $account->setBalance($row['balance']);

            $account_move->setAmount($row['am.amount']);
            $account_move->setObjAccount($account);
            $account_move->setObjMove($move);

            array_push($result,$account_move);
        }
        $this->account_move_list = $result;
        return $result;
    }
}