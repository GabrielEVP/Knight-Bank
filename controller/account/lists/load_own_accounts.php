<?php 
include_once ("../../../model/account/account_list.php"); 
session_start();

$account_list = new account_list();

$account_list->get_accounts_from_user_id($_SESSION['id_user']);
$accounts = $account_list->getArrayObjVars('account_list');

echo json_encode($accounts);

?>