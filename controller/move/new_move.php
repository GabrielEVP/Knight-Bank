<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php");
include_once ("../../model/account_move/account_move_model.php"); 
include_once ("../../model/move/move_model.php"); 
include_once ("../../model/move_type/move_type_model.php"); 

session_start();

$response = array();

$data=json_decode(file_get_contents("php://input"),true);


$account = new account_model();
$user = new user_model();

$user->setIdUser($_SESSION['id_user']);
$account->setObjUser($user);
$account->setIBAN($data['sender_IBAN']);



if (!isset($data['amount']) || !isset($data['sender_IBAN']) || !$account->check_account_ownership() || !(floatval($data['amount']) > 0) ) {
    $response['status'] = "error";
} else if ($data['move_type'] == 'deposit' || $data['move_type'] == 'withdrawal') {

    $move = new move_model();
    $move_type = new move_type_model();
    $move->setObjMoveType($move_type->get_move_type_by_name($data['move_type']));
   
    $move->setNotion($data['notion']);

    $account_move = new account_move_model();
    $account_move->setObjAccount($account);
    $account_move->setObjMove($move);
    $account_move->setAmount($data['amount']);

    $account_move->save_move();
    $response['status'] = ($account->update_balance($data['amount'])) ?  "ok" : "error";
        
} else if (isset($data['receiver_IBAN']) && $data['move_type'] == 'transference') {

    $move = new move_model();   
    $move->setNotion($data['notion']);

    $account_move = new account_move_model();
    $account_move->setObjAccount($account);
    $account_move->setObjMove($move);
    $account_move->setAmount($data['amount']);

    $response['status'] = ($account_move->save_transference($data['receiver_IBAN'])) ? "ok" : "error"; 
} else {
    $response['status'] = "error";
}

echo json_encode($response);