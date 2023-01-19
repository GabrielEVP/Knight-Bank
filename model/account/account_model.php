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

    public function get_financial_data ($options = array()) {
        //**AVAILABLE OPTIONS**
        //period = MONTH,YEAR,DAY : filtran por el ultimo mes año o dia
        //user = user.id_user : filtra en base a usuario
        //iban = account.IBAN : filtra en base al IBAN de las cuentas bancarias
        //monthly = 1 : agrupa los resultados en mensualidades 

        if (!is_array($options)) { 
            return null;
        }
        $sql = "";

        $sql_select = "";
        $extra_columns = "";
        $sql_from = "";
        $sql_where_base = "";
        $sql_where = "";
        $sql_group = "";

        $extra_columns .= (isset($options['monthly']))  ? ", d.date as 'month' ": " " ;
        
        $sql_select = "SELECT IFNULL(sum(amount),0)  as 'expenses_income' $extra_columns ";
        if (isset($options['monthly'])) {
            $extra_columns .= " , d.date";
            $sql_from .= " FROM 
                    (SELECT 1 as 'date'";
            for ($i = 2; $i < 13; $i++) {
                $sql_from.= " UNION SELECT $i ";
            }
            $sql_from .= " ) as d
                        LEFT JOIN move m
                            ON d.date = MONTH(m.dateTime)
                        LEFT JOIN account_move am
                            ON m.id_move = am.id_move
                        LEFT JOIN account a   
                            ON am.id_account = a.id_account";
        } else {
            $sql_from .=" FROM account a 
                        INNER JOIN account_move am
                            ON am.id_account = a.id_account
                        INNER JOIN move m 
                            ON m.id_move = am.id_move";
        }
        $sql_where_base .= " WHERE IFNULL(am.amount,-1) < 0 ";

        $sql_where .= (isset($options['period']))  ? " AND IFNULL(" . $options['period'] . "(m.dateTime), " . $options['period'] . "(CURDATE()) ) = " . $options['period'] ."(CURDATE()) " : " " ;
        $sql_where .= (isset($options['user']))  ? " AND IFNULL(a.id_user,IF(a.id_user_hist IS NULL ," . $options['user'] . ",-1)) = " . $options['user'] . " " : " " ;
        $sql_where .= (isset($options['iban']))  ? " AND IFNULL(a.IBAN, " . $options['iban'] . ") = '" . $options['iban'] . "' ": " " ;

        $sql_group .= (isset($options['monthly']))  ? " GROUP BY ": " " ;
        $sql_group .= (isset($options['monthly']))  ? " d.date ,": " " ;
        $sql_group = rtrim($sql_group,",");

        $sql .= "$sql_select  
                 $sql_from  
                 $sql_where_base  
                 $sql_where  
                 $sql_group";
        $sql_where_base = "WHERE IFNULL(am.amount,-1) > 0";
        $sql .= " 
                UNION ALL  
                $sql_select
                $sql_from
                $sql_where_base
                $sql_where 
                $sql_group";

        $select = select_array($sql);

        $numrows = count($select)/2;
        $result = array(
            "expenses" => array(),
            "income" => array(),
        );
        $counter = 1;
        foreach ($select as $moveset) {
            ($counter <= $numrows)? array_push($result['expenses'],$moveset) : array_push($result['income'],$moveset);   
            $counter++;
        }

        return $result;
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