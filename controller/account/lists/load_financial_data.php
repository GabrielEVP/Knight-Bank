<?php
include_once ("../../../model/account/account_list.php"); 
include_once ("../../../model/user/account_move_model.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

$account_list = new account_list();
$result = array();

$account_list->get_accounts_from_user_id($_SESSION['id_user']);
$result['accounts'] = $account_list->getAccountList();

$result['financial_data'] = $account_list->get_financial_data();

echo json_encode($result);
