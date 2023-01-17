<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php");
include_once ("../../model/account_move/account_move_model.php"); 
include_once ("../../model/move/move_model.php"); 

session_start();

$response = array();

$data=json_decode(file_get_contents("php://input"),true);


$account = new account_model();
$user = new user_model();

$user->setIdUser($_SESSION['id_user']);
$account->setObjUser($user);

if (!$account->check_account_ownership()) {

} else {

    $deposit = new move_model();
    $deposit->setIdMoveType(3);
    $deposit->setNotion($data['notion']);

    $account_move = new account_move_model();
    $account_move->setObjAccount($account);
    $account_move->setObjMove($deposit);

    $account_move->save_move();
}