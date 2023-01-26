<?php 
include_once ("../../../model/account/account_model.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {
    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();
    $user->setIdUser($data['id_user']);

    $account_list = new account_model();
    $account_list->setObjUser($user);
    $accounts = $account_list->get_accounts_from_user_id();

    //$accounts = $account_list->getArrayObjVars('account_list');

    echo json_encode($accounts);
} else {
    echo json_encode("no admin");
}
?>