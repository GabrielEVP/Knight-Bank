<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/function.php"); 

session_start();

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();

$user->setIdUser($_SESSION['id_user']);


$folder_path = $root_path . "view\img\aplication\user\\";
$result = array();

$valid = true;
$valid &= $user->reset_profile_image();
$valid &= file_exists($folder_path . $_SESSION['foto']) && $_SESSION['foto'] != "0_default.png";

if ($valid && unlink($folder_path . $_SESSION['foto'])) {
    $result['status'] = 'ok';
} else {
    $result['status'] = 'error';
} 

echo json_encode($result);



?>