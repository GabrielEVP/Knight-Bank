<?php
//*FUNCIONES PARA EJECUCION DE QUERYS EN LA BBDD*
include_once ("conect.php"); 
include_once ("query_function.php"); 
//------------------------------------------------------------------
//INSERT
//------------------------------------------------------------------
function insert($sql) {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    return $bbdd->link->query($sql); 
    
}
//------------------------------------------------------------------
//UPDATE
//------------------------------------------------------------------
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
//------------------------------------------------------------------
//DELETE
//------------------------------------------------------------------
function delete($table , $id, $keyname ='id') {

    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd); 
    $sql = "delete from $table where $keyname = '$id'";
    $bbdd->link->query($sql);

    if ($bbdd->link->affected_rows == 1) {
        return true; 
    } else {
        return false;
    }

}
//------------------------------------------------------------------
//SELECT OBJECT
//------------------------------------------------------------------

//retorna un array con objetos genericos (STD) 
function select_Object($sql) {
    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    $result = $bbdd->link->query($sql); 

    $bbdd->CloseConnect();
    return result_object_Array($result);
}

//retorna un unico objeto generico (STD)
function single_row_object_select($sql,$object_type) {
    $select = select_Object($sql);
    if (count($select) > 0) {
        return cast_array($select, new $object_type())[0];
    } else {
        return null;
    }
    
}
//------------------------------------------------------------------
//SELECT ARRAY
//------------------------------------------------------------------

//retorna una array bidimensional 
function select_array($sql) {
    $bbdd = new conect();
    $bbdd->OpenConnect($bbdd);  
    $result = $bbdd->link->query($sql); 

    $bbdd->CloseConnect();
    return result_Array($result);

}

//retorna un array
function single_row_array_select($sql) {
    $result = select_array($sql);
    if(count($result) > 0) {
        return $result[0];
    } else {
        return false;
    }
}
?>