<?php 
include_once ("model/user/user_model.php"); 
include_once ("model/user/account_model.php"); 

$response = array();

if ($_SESSION['admin'] == 1) {

    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();

    $user->setIdUser($data['id_user']);
    if ($user->delete_user()) {
        $response['status'] = 'ok';
    } else {
        $response['status'] = 'sql  error';
    }

} else {
    $response['status'] = 'no admin';
}

echo json_encode($response);