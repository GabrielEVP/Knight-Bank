<?php
include_once ("../../../model/account/account_list.php"); 
//include_once ("../../../model/account_move/account_move_model.php"); 
//include_once ("../../../model/user/user_model.php"); 

session_start();
$response = array();
$account_list = new account_list();
$response['list'] = $account_list->get_all_IBAN();

echo json_encode($response);