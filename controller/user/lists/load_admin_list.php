<?php 
include_once ("../../../model/user/user_list.php"); 
if ($_SESSION['admin'] == 1) {

$user_list = new user_list();

$user_list->get_user_list_from_BBDD();
$administrators = $user_list->get_administrators();

echo json_encode($administrators);
} else {
    echo json_encode("no admin");
}
?>