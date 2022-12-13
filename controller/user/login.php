<?php 
include_once ("model/user/user_model.php"); 

$_SESSION['login_tries'];
$_SESSION['login_time'];

$user = new user_model();
$user->setNIF($_POST['NIF']);
$user->setPassword($_POST['password']);

$result = array();

$result['status'] = $user->login();
if ($result['status'] == "ok") {
    session_start();

    $_SESSION['id_user'] = $user->getIdUser();
    $_SESSION['gmail'] = $user->getGmail();
    $_SESSION['NIF'] = $user->getNIF();
    $_SESSION['name'] = $user->getName();
    $_SESSION['surname'] = $user->getSurname();
   // $_SESSION['password'] = $user->getPassword();
    $_SESSION['admin'] = $user->getAdmin();

    $result['user'] = $user;
} else if ($result['status'] == "credenciales incorrectas") {
    //bajar los login tries del usuario y poner timer
}

echo json_encode($result);
?>