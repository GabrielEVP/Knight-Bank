<?php
include_once ("model/user/user_model.php"); 

session_start();

$response = array();
if (isset($_SESSION['id_user'])) {

    $user = new user_model();

    $user->setIdUser($_SESSION['id_user']);
    $user->setIdUser($_SESSION['getGmail']);
    $user->setIdUser($_SESSION['getNIF']);
    $user->setIdUser($_SESSION['getName']);
    $user->setIdUser($_SESSION['getSurname']);
    $user->setIdUser($_SESSION['getAdmin']);
    
    $response['logged'] = true;
    $response['user'] = $user->getObjvars();
} else {
    $response['logged'] = false;
}

echo json_encode($response);

?>