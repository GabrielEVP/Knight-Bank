<?php 
include_once ("../../../model/user/user_list.php"); 

$user_list = new user_list();
$user_list->get_user_list_from_BBDD();
<<<<<<< HEAD
=======

>>>>>>> 76e7fdf01695d1ebb88f5c1781f8e879fb35cba1
$users = $user_list->getArrayObjVars("user_list");

echo json_encode($users);
?>