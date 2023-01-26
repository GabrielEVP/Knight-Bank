<?php
//include_once ("../../../model/account/account_list.php"); 
include_once ("../../../model/account/account_model.php"); 
include_once ("../../../model/account_move/account_move_model.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

$account_list = new account_model();
$user = new user_model();

$user->setIdUser($_SESSION['id_user']);
$account_list->setObjUser($user);

$result = array();
$result['accounts'] = $account_list->get_accounts_from_user_id();

$result['monthly_financial_data'] = $account_list->get_financial_data_from_user(array("monthly" => 1, "period"=>"YEAR"));
$result['present_financial_data'] = $account_list->get_financial_data_from_user(array("period" => "MONTH"));


echo json_encode($result);
