<?php
include_once ("../../model/account/account_model.php"); 
include_once ("../../model/user/account_move_model.php"); 
include_once ("../../model/user/user_model.php"); 

session_start();

$account = new account_model();
$result = array();

$options = array(

    'period' => "MONTH",
    'user' => $_SESSION['id_user'],
);
$account->get_financial_data();
