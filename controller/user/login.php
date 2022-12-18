<?php 
include_once ("../../model/user/user_model.php"); 
session_start();

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();
$user->setNIF($data['NIF']);
$user->setPassword($data['password']);

$result = array();

if (isset($_SESSION['banTime'])) {
    if ($_SESSION['banTime'] < time()) {
        $user->get_id_by_NIF();
        $user->unBan();
        unset($_SESSION['banTime']);
    } else {
        $result['status'] = "banned";
        $result['banTime'] = $_SESSION['banTime'] - time();
    }
}  

if (!isset($_SESSION['banTime'])) {
    $result['status'] = $user->login();

    if ($result['status'] == "ok") {
        $_SESSION['id_user'] = $user->getIdUser();
        $_SESSION['gmail'] = $user->getGmail();
        $_SESSION['NIF'] = $user->getNIF();
        $_SESSION['name'] = $user->getName();
        $_SESSION['surname'] = $user->getSurname();
        $_SESSION['admin'] = $user->getAdmin();

        $result['user'] = $user->getObjvars();
    } else if ($result['status'] == "credenciales incorrectas") {
        $remaining_tries = $user->login_fail();
        if ($remaining_tries <= 0) {
            $_SESSION['banTime'] = time() + 60;//tiempo en segundos
        }
    } else if ($result['status'] == "banned") {//caso de que un baneado intente entrar desde otro equipo
        $_SESSION['banTime'] = time() + 60;
    }
}

echo json_encode($result);
?>