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
            $temp_length = count($temp);
            for ($i = 1; $i < $temp_length; $i++) {
                $key_name .= ucfirst($temp[$i]);
            }
            unset($temp_length);
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
            $temp_length = count($temp);
            for ($i = 1; $i < $temp_length; $i++) {
                $key_name .= ucfirst($temp[$i]);
            }
            unset($temp_length);
            unset($temp);
        } else {
            $key_name = $key;

        }
        return "set" . ucfirst($key_name);
}

function refactor_array_indexes($input_array) {
    $result = array();
    $array_length = count($input_array);

    foreach ($input_array as $value) {
        array_push($result, $value);
    }
    unset($array_length);

    return $result;
}

function refactor_profile_img_path($filename) {
    
    $folder_path = str_replace("model","",__DIR__) . "view\img\aplication\user\\";
    if ($filename == null || $filename == "") {
        return  $folder_path . "0_default.png";//imagen por defecto
    } else {
        return  $folder_path . $filename;
    }
}
?>