<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/account/account_model.php"); 

$response = array();

//if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {

    $data=json_decode(file_get_contents("php://input"),true);

    $user = new user_model();

    $user->setGmail($data['gmail']);
    $user->setNIF($data['NIF']);
    $user->setName($data['name']);
    $user->setSurname($data['surname']);
    $user->setAdmin(0);
    
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $user->setPassword($password);
    
    if (!$user->check_NIF_exists()) {
        if ($user->insert_user()) {
            $user->get_id_by_NIF();
            
            $account_inserted = true;
            for ($i = 0; $i<2 && $account_inserted == true; $i++) {
                $account = new account_model();
                $account->generate_new_IBAN();
    
                $account->setObjUser($user);
    
                $account_inserted = $account->insert_account();
            }

            if ($account_inserted == true) {
                $response['status'] = "ok";
            } else {
                $response['status'] = "account generation error";
            }
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













?>