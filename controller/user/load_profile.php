<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php"); 

session_start();
$response = array();


    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();

    $user->get_user($_SESSION['id_user']);
    $response['user'] = $user->getObjvars();
    $response['status'] = 'ok';

echo json_encode($response);



