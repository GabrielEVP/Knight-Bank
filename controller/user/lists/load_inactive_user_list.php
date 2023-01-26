<?php 
include_once ("../../../model/user/user_model.php"); 
session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {

$user_list = new user_model();

//$user_list->get_user_list_from_BBDD();
$inactive_users = $user_list->get_inactive_extra_list();

echo json_encode($inactive_users);
} else {
    echo json_encode("no admin");
}
?>