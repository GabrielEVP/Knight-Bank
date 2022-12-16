<?php 

function cast($stdObject,$new_object) {

    $vars = get_object_vars($stdObject);
    foreach ($vars as $key => $valor) {
        $key_name = "";
        if (str_contains($key,"_")) {
            $temp = explode("_",$key);
            $key_name .= ucfirst($temp[0]);
            for ($i = 1; $i < count($temp); $i++) {
                $key_name .= ucfirst($temp[$i]);
            }
            unset($temp);
        } else {
            $key_name = $key;

        }
        $setter = "set" . ucfirst($key_name) ;
        $new_object->$setter($valor);
    }

    return $new_object;
}

function cast_array($array,$type) {

    $result = array();
    foreach($array as $object) {
        $casted_object = cast($object,new $type());
        array_push($result,$casted_object);
    }

    return $result;
}

?>