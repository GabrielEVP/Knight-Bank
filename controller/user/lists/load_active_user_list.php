<?php 
include_once ("../../../model/user/user_list.php"); 

$user_list = new user_list();

$user_list->get_user_list_from_BBDD();
$active_users = $user_list->get_active_users();

echo json_encode($active_users);
/*} else {
    echo json_encode("no admin");
}*/
?>