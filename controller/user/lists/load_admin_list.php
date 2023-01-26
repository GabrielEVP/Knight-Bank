<?php 
include_once ("../../../model/user/user_model.php"); 
include_once ("../../../model/function.php"); 

session_start();
if (isset($_SESSION['admin']) && $_SESSION['admin'] == 1) {//medida de seguridad

    $user_list = new user_model();

    //$user_list->get_user_list_from_BBDD();
    $administrators = $user_list->get_administrator_extra_list();

    $loged_user = array_search($_SESSION['NIF'], array_column($administrators, 'NIF'));
    unset($administrators[$loged_user]); //quitamos el usuario que esta loegeado

    echo json_encode(refactor_array_indexes($administrators));
} else {
    echo json_encode("no admin");
}
?>