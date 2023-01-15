<?php 
include_once ("account_model.php"); 
include_once (str_replace("account", "", __DIR__  . "database/query.php")); 
include_once (str_replace("account", "", __DIR__  . "function.php")); 
include_once (str_replace("account", "", __DIR__  . "standard_class.php")); 
class account_list extends standard_class{

    private $account_list;

    /**
     * Get the value of account_list
     */
    public function getAccountList()
    {
        return $this->account_list;
    }

    /**
     * Set the value of account_list
     */
    public function setAccountList($account_list): self
    {
        $this->account_list = $account_list;

        return $this;
    }

    public function get_accounts_from_user_id ($user_id) {
        $select = select_Object("SELECT * FROM account WHERE id_user = $user_id");
        $this->account_list = cast_array($select, new account_model());
    }
}
?>