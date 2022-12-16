<?php 
include_once ("../../model/user/user_model.php"); 
session_start();

// $_SESSION['login_tries'];
// $_SESSION['login_time'];

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();
$user->setNIF($data['nif']);
$user->setPassword($data['password']);
//var_dump($user->getObjvars());
$result = array();

if (isset($_SESSION['banTime'])) {
    if ($_SESSION['banTime'] < time()) {
        $user->unBan();
        unset($_SESSION['banTime']);
    } else {
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
    // $_SESSION['password'] = $user->getPassword();
        $_SESSION['admin'] = $user->getAdmin();

        $result['user'] = $user->getObjvars();
    } else if ($result['status'] == "credenciales incorrectas") {
        $remaining_tries = $user->login_fail();
        if ($remaining_tries <= 0) {
            $_SESSION['banTime'] = time() + 60;//tiempo en segundos
        }
    } else if ($result['status'] == "usuario baneado") {//caso de que un baneado intente entrar desde otro equipo
        $_SESSION['banTime'] = time() + 60;
    }
}
echo json_encode($result);
?>