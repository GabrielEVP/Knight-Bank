<?php
include_once ("../../../model/account/account_list.php"); 
include_once ("../../../model/account_move/account_move_model.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

$account_list = new account_list();
$result = array();

$account_list->get_accounts_from_user_id($_SESSION['id_user']);
$result['accounts'] = $account_list->getArrayObjVars("account_list");

$result['monthly_financial_data'] = $account_list->get_financial_data(array("monthly" => 1, "period"=>"YEAR"));
//$result['monthly_financial_data'][]
$result['present_financial_data'] = $account_list->get_financial_data(array("period" => "MONTH"));


echo json_encode($result);
