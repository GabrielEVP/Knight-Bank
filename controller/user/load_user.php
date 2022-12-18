<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php"); 

$response = array();

//if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {

    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();

    $user->get_user($data['id_user']);
    $response['user'] = $user->getObjvars();
    $response['status'] = 'ok';
    
/*} else {
    $response['status'] = 'no admin';
}*/

echo json_encode($response);



