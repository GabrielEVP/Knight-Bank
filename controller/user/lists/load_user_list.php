<?php 
include_once ("../../../model/user/user_list.php"); 
//if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {

$user_list = new user_list();
$user_list->get_user_list_from_BBDD();
$users = $user_list->getArrayObjVars("user_list");

echo json_encode($users);
/*} else {
    echo json_encode("no admin");
}*/
?>