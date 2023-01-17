<?php
//*FUNCIONES BASE PARA EL FICHERO QUERY.PHP, MANIPULACION DE RESULTADOS SQL

//------------------------------------------------------------------
//RETORNOS DE OBJETOS GENERICOS
//------------------------------------------------------------------

//convierte un resultado sql en un array de objetos genericos (std)
function result_object_Array($result) {

    $final_array = array();
    
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { 
        array_push($final_array , row_object($row));
    }

    mysqli_free_result($result);
    return $final_array;
}

//recibe una linea de array y la convierte en objeto generico
function row_object($row) {

    $object = new stdClass();
    foreach ($row as $nombre => $valor) {
        $object->$nombre=$valor;
    }

    return $object;
}

//------------------------------------------------------------------
//RETORNO DE ARRAYS
//------------------------------------------------------------------

//convierte un resultado sql en un array bidimensional
function result_Array($result) {

    $final_array = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { 
        array_push($final_array , $row);
    }

    mysqli_free_result($result);
    return $final_array;
}

?>