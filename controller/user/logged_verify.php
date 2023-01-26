<?php
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/function.php"); 

session_start();

$response = array();
if (isset($_SESSION['admin'])) {

    $user = new user_model();
    $user->get_user($_SESSION['id_user']);
    $user->setFoto(refactor_profile_img_path($user->getFoto()));

    $_SESSION['gmail'] = $user->getGmail();
    $_SESSION['foto'] = $user->getFoto();
    $_SESSION['NIF'] = $user->getNIF();
    $_SESSION['name'] = $user->getName();
    $_SESSION['surname'] = $user->getSurname();
    $_SESSION['admin'] = $user->getAdmin();
    
    $response['logged'] = true;
    $response['user'] = $user->getObjvars();
} else {
    $response['logged'] = false;
}

echo json_encode($response);

?>