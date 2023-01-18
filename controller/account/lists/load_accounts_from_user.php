<?php 
include_once ("../../../model/account/account_list.php"); 
include_once ("../../../model/user/user_model.php"); 

session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {
    $data=json_decode(file_get_contents("php://input"),true);

    $account_list = new account_list();

    $accounts = $account_list->getArrayObjVars('account_list');

    echo json_encode($accounts);
} else {
    echo json_encode("no admin");
}
?>