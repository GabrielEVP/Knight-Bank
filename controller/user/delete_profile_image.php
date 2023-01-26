<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/function.php"); 

session_start();

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();
$user->setIdUser($_SESSION['id_user']);

$temp = explode("\\",$_SESSION['foto']);
$image = end($temp);
unset($temp);

$root_path = str_replace(["controller\user","controller/user"],"",__DIR__);
//$folder_path = $root_path . "view\img\aplication\user\\";
$folder_path = $root_path . "view/img/aplication/user/";

$result = array();

$valid = true;
$valid &= ($image == "0_default.png")? true : $user->reset_profile_image();
$valid &= file_exists($folder_path . $image);

if ($valid && $image == "0_default.png") {
    $result['status'] = 'default image';
} else if ($valid && unlink($folder_path . $image)) {
    $result['status'] = 'ok';
    $_SESSION['foto'] = refactor_profile_img_path("0_default.png");

} else {
    $result['status'] = 'error';
}

echo json_encode($result);



?>