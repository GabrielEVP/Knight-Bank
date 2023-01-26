<?php 
//include_once ("../../../model/account_move/account_move_list.php"); 
include_once ("../../../model/account_move/account_move_model.php"); 
include_once ("../../../model/account/account_model.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();
$user->setIdUser($_SESSION['id_user']);

$account = new account_model();
$account->setObjUser($user);
(isset($data['IBAN']))? $account->setIBAN($data['IBAN']) : "";

$response = array();
if (!isset($data['IBAN']) || !$account->check_account_ownership()) {
    $response['status'] = 'error';
} else if (!isset($data['filter_type'])) {
    $account->setIBAN($data['IBAN']);
    $account_move_list = new account_move_model();
    $response['list'] = $account_move_list->get_moves_from_IBAN($data['IBAN']);
    $response['status'] = "ok";
} else {
    $options = array();
    (isset($data['filter_type']) && $data['filter_type'] != 'all') ? $options[$data['filter_type']] = 1  : "";
    (isset($data['start_date']) && $data['start_date'] != "") ? $options['start_date'] = $data['start_date']  : "";
    (isset($data['end_date']) && $data['end_date'] != "" ) ? $options['end_date'] = $data['end_date']  : "";

    $account_move_list = new account_move_model();
    $response['list'] = $account_move_list->get_moves_from_IBAN($data['IBAN'],$options);
    $response['status'] = "ok";
    $response['list'] = array_map("process_move",$response['list']);
}

echo json_encode($response);






function process_move($move) {
    $move_translations = array(
        "deposit" => "deposito",
        "withdrawal" => "retiro",
        "receive_transference" => "transferencia recibida",
        "send_transference" => "transferencia enviada",
    );
    $move['objMove']['objMoveType']['name'] = $move_translations[$move['objMove']['objMoveType']['name']];
    $move['amount'] = number_format($move['amount'],2,",",".");
    return $move;
}


?>