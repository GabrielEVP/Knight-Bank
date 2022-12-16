<?php 
include_once ("../../../model/user/user_list.php"); 

$user_list = new user_list();

$user_list->get_user_list_from_BBDD();
$inactive_users = $user_list->get_administrators();

echo json_encode($active_users);
?>