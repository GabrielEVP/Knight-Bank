<?php
include_once ("../../model/user/user_model.php"); 

session_start();

$response = array();
if (isset($_SESSION['admin'])) {

    $user = new user_model();
    $user->setIdUser($_SESSION['id_user']);
    $user->setGmail($_SESSION['gmail']);
    $user->setFoto($_SESSION['foto']);
    $user->setNIF($_SESSION['NIF']);
    $user->setName($_SESSION['name']);
    $user->setSurname($_SESSION['surname']);
    $user->setPassword($_SESSION['admin']);
    
    $response['logged'] = true;
    $response['admin'] = $_SESSION['admin'];
    $response['user'] = $user->getObjvars();
} else {
    $response['logged'] = false;
}

echo json_encode($response);

?>