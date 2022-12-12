<?php

function row_object($row) {

    $object = new stdClass();
    foreach ($row as $nombre => $valor) {
        $object->$nombre=$valor;
    }

    return $object;
}

function result_object_Array($result) {

    $final_array = array();
    
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { 
        array_push($final_array , row_object($row));
    }

    mysqli_free_result($result);
    return $final_array;
}

function select_Array($sql) {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    $result = $bbdd->link->query($sql); 
    result_array($result);

}

function result_Array($result) {

    $final_array = array();
    
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { 
        array_push($final_array , $row);
    }

    mysqli_free_result($result);
    return $final_array;
}

?>