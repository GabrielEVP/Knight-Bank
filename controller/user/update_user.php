<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php"); 

$response = array();

//if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {

    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();

    $user->setIdUser($data['id_user']);
    $user->setGmail($data['gmail']);
    $user->setNIF($data['NIF']);
    $user->setName($data['name']);
    $user->setSurname($data['surname']);
   // $user->setAdmin($data['admin']);
    
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $user->setPassword($password);
    
    if ($user->check_NIF_change_available()) {
    
        if ($user->update_user()) {
            $response['status'] = "ok";
        } else {
            $response['status'] = "sql error";
        }
    } else {
        $response['status'] = 'invalid NIF';
    }
    
/*} else {
    $response['status'] = 'no admin';
}*/

echo json_encode($response);



