<?php 
include_once ("model/user/user_list.php"); 

$user_list = new user_list();

$user_list->get_user_list_from_BBDD();
$users = $user_list->getObjvars();

echo json_encode($users);
?>