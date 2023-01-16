<?php 
include_once ("../../model/user/user_model.php"); 
include_once ("../../model/function.php"); 

session_start();

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();

$user->setIdUser($_SESSION['id_user']);
$user->reset_profile_image();



?>