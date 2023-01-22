<?php 
include_once ("../../../model/account_move/account_move_list.php"); 
include_once ("../../../model/account/account_model.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();
$user->setIdUser($_SESSION['id_user']);

$account = new account_model();
$account->setObjUser($user);
$account->setIBAN($data['IBAN']);

$response = array();
if (!isset($data['IBAN']) && !$account->check_account_ownership()) {
    $response['status'] = 'error';
} else if (!isset($data['filter_type'])) {

    $account_move_list = new account_move_list();
    $account_move_list->get_moves_from_IBAN($data['IBAN']);
    $response['status'] = "ok";
    $response['list'] = $account_move_list->getArrayObjVars("account_move_list");

} else {
    $options = array();
    (isset($data['filter_type']) && $data['filter_type'] != 'all') ? $options[$data['filter_type']] = 1  : "";
    //(isset($data['start_date'])) ? $options['start_date'] = $data['start_date']  : "";
    //(isset($data['end_date'])) ? $options['end_date'] = $data['end_date']  : "";

    $account_move_list = new account_move_list();
    $response['list'] = $account_move_list->get_moves_from_IBAN($data['IBAN'],$options);
    $response['status'] = "ok";
    //$response['list'] = $account_move_list->getArrayObjVars("account_move_list");
}

echo json_encode($response)


?>