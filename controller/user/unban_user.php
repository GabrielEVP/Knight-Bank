<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php"); 
session_start();

$response = array();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {

    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();

    $user->setIdUser($data['id_user']);
    if ($user->unBan()) {
        $response['status'] = 'ok';
    } else {
        $response['status'] = 'sql  error';
    }

} else {
    $response['status'] = 'no admin';
}

echo json_encode($response);