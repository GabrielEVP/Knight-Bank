<?php 
include_once ("../../model/account/account_list.php"); 
session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {
    $data=json_decode(file_get_contents("php://input"),true);

    $account_list = new account_list();

    $account_list->get_accounts_from_user_id($data['id_user']);
    $accounts = $account_list->getArrayObjVars('account_list');

    echo json_encode($accounts);
} else {
    echo json_encode("no admin");
}
?>