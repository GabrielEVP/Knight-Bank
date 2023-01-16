<?php 
include_once ("../../../model/user/user_list.php"); 
include_once ("../../../model/function.php"); 

session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {
    $data=json_decode(file_get_contents("php://input"),true);

    $user_list = new user_list();
    
    $user_list->search_list_from_DDBB($data['search']);
    $users = $user_list->get_extra_list();

    $loged_user = array_search($_SESSION['NIF'], array_column($users, 'NIF'));
    if ($loged_user !== false) {
        unset($users[$loged_user]); //quitamos el usuario que esta loegeado
    }
    echo json_encode(refactor_array_indexes($users));
} else {
    echo json_encode("no admin");
}
?>