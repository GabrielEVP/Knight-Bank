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

}