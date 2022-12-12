<?php

include_once ("conect.php"); 
include_once ("query_function.php"); 

function select_Object($sql) {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    $result = $bbdd->link->query($sql); 
    return result_object_Array($result);

}

function delete($table , $id) {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd); 
    $sql = "delete from $table where id = $id";
    $bbdd->link->query($sql);

    if ($bbdd->link->affected_rows == 1) {
        return true; 
    } else {
        return false;
    }

}

function insert($sql) {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    return $bbdd->link->query($sql); 
    
}

function update($sql) {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    $bbdd->link->query($sql); 

    if ($bbdd->link->affected_rows > 0) {
        return true; 
    } else {
        return false;
    }

}

?>