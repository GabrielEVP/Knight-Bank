<?php 
include_once ("model/user/user_model.php"); 

$_SESSION['login_tries'];
$_SESSION['login_time'];

$user = new user_model();
$user->setNIF($_POST['NIF']);
$user->setPassword($_POST['password']);

$result = array();
if ($user->login() != false) {
    session_start();

    $_SESSION['id_user'] = $user->getIdUser();
    $_SESSION['gmail'] = $user->getGmail();
    $_SESSION['NIF'] = $user->getNIF();
    $_SESSION['name'] = $user->getName();
    $_SESSION['surname'] = $user->getSurname();
    $_SESSION['password'] = $user->getPassword();
    $_SESSION['admin'] = $user->getAdmin();
    $_SESSION['active'] = $user->getActive();

    $result['error'] = false; 
} else {
    $result['error'] = "login failed";
}

echo json_encode($result);
?>