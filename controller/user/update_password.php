<?php  
include_once ("../../model/user/user_model.php"); 
session_start();

$data=json_decode(file_get_contents("php://input"),true);

$response = array();
if (!isset($_SESSION['id_user']) || !isset($data['password'])) {
    $response['status'] = "error";
} else {
    $user = new user_model();

    $user->setIdUser($_SESSION['id_user']);
    $user->setPassword(password_hash($data['password'],PASSWORD_DEFAULT));

    $response['status'] = ($user->change_password()) ? "ok" : "error" ;
}

echo json_encode($response);


?>