<?php 
include_once ("../../model/account/account_model.php"); 
include_once ("../../model/user/user_model.php"); 


//if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {
$data=json_decode(file_get_contents("php://input"),true);

if (isset($data['id_user'])) {
    $account = new account_model();
    $account->generate_new_IBAN();
    
    $user = new user_model();
    $user->setIdUser($data['id_user']);
    $account->setObjUser($user);
    
    $result = array();
    if ($account->insert_account()) {
        $result['status'] = 'ok';
    } else {
        $result['status'] = 'error';
    }
} else {
    $result['status'] = 'no user';
}

echo json_encode($result);
/*} else {
    echo json_encode("no admin");
}*/
?>