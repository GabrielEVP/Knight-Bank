<?php 
include_once ("../../../model/user/user_model.php"); 
include_once ("../../../model/function.php"); 

session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {
    $data=json_decode(file_get_contents("php://input"),true);

    $user_list = new user_model();
    $users = $user_list->search_list_from_DDBB($data['search']);
    $users_id = array_column($users,"id_user");
    $extra_data_list = $user_list->get_full_extra_list();

    $final_users = array();
    foreach ($extra_data_list as $extra_data) {
        if (array_search($extra_data['id_user'],$users_id) !== false) {
            array_push($final_users,$extra_data);
        }
    }

    $loged_user = array_search($_SESSION['NIF'], array_column($final_users, 'NIF'));
    if ($loged_user !== false) {
        unset($final_users[$loged_user]); //quitamos el usuario que esta logeado
    }
    echo json_encode(refactor_array_indexes($final_users));
} else {
    echo json_encode("no admin");
}
?>