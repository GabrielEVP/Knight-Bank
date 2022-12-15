<?php 
include_once ("model/user/user_model.php"); 
include_once ("model/user/account_model.php"); 

$data=json_decode(file_get_contents("php://input"),true);

$user = new user_model();

$user->setGmail($data['gmail']);
$user->setNIF($data['nif']);
$user->setName($data['name']);
$user->setSurname($data['surname']);
$user->setAdmin($data['admin']);

$password = password_hash($data['password'], PASSWORD_DEFAULT);
$user->setPassword($password);


if ($user->insert_user()) {
    
}













?>