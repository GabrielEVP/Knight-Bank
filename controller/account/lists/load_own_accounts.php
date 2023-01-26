<?php 
include_once ("../../../model/account/account_model.php"); 
include_once ("../../../model/user/user_model.php"); 
session_start();

$account_list = new account_model();

$user = new user_model();
$user->setIdUser($_SESSION['id_user']);
$account_list->setObjUser($user);

$accounts = $account_list->get_accounts_from_user_id();
//$accounts = $account_list->getArrayObjVars('account_list');

echo json_encode($accounts);

?>