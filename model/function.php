<?php 

function cast($stdObject,$new_object) {

    $vars = get_object_vars($stdObject);
    foreach ($vars as $key => $valor) {
        
        $setter = create_setter($key);
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

function create_getter($key) {
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
        return "get" . ucfirst($key_name);
}

function create_setter($key) {
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
        return "set" . ucfirst($key_name);
}
?>