<?php 
include_once ("../../model/user/user_model.php"); 
session_start();

$root_path = str_replace("controller\user","",__DIR__);

if (! (isset($_POST['name'])) ) {//si no ha mandado el formulario
    header("Location: " . $root_path . "view\pages\aplication\configuration.html");
} else if (! (isset($_POST['name'])) ) {//si no esta logeado
    header("Location: " . $root_path . "index.html");
} else {
    $response = array();

    $new_user = new user_model();
    $old_user = new user_model();
    
    $old_user->setNIF($_SESSION['NIF']);
    $old_user->get_user($old_user->get_id_by_NIF());
    
    if (isset($_FILES['image'])) {
        
        $folder_path = $root_path . "view\img\aplication\user\\";
        $path = $folder_path . $old_user->getIdUser() . "_" . $_FILES['image']['name'];
        $sql_path = $old_user->getIdUser() . "_" . $_FILES['image']['name'];
        
        $new_user->setFoto($sql_path);
        
        if (file_exists($folder_path . $old_user->getFoto()) && $old_user->getFoto() != "0_default.png") {
            unlink($folder_path . $old_user->getFoto());
        }
        
        if ( !(move_uploaded_file($_FILES['image']['tmp_name'], $path) )) {
            $response['error'] = 'error al guardar la imagen';
        }
    } else {
        $new_user->setFoto($old_user->getFoto());
    }
    
    if (!isset($response['error'])) {
        $new_user->setIdUser($old_user->getIdUser());
        $new_user->setPassword($old_user->getPassword());
        $new_user->setNIF($old_user->getNIF());
        
        $new_user->setName($_POST['name']);
        $new_user->setSurname($_POST['surname']);
        $new_user->setGmail($_POST['gmail']);
        
        $new_user->update_user();
    
        $_SESSION['gmail'] = $new_user->getGmail();
        $_SESSION['name'] = $new_user->getName();
        $_SESSION['surname'] = $new_user->getSurname();

        if ($user->getFoto() == null || $new_user->getFoto() == "") {
            $_SESSION['foto'] = $folder_path . "0_default.png";//imagen por defecto
        } else {
            $root_path = str_replace("controller\user","",__DIR__);
            $folder_path = $root_path . "view\img\aplication\user\\";
            $_SESSION['foto'] = $folder_path . $new_user->getFoto();
        }

        $response['status'] = 'ok';
    }
    header("Location: " . $root_path . "view\pages\aplication\configuration.html");
}


?>