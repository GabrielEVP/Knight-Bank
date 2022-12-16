<?php 
include_once 'function.php';
class standard_class {
    
    public function getObjvars() {
        return get_object_vars($this);
    }

    public function getArrayObjVars($arrayname) {
        $response_array = array();
        $getter =  create_getter($arrayname);
        foreach ($this->$getter() as $object) {
            array_push($response_array,$object->getObjvars());
        }
        return $response_array;
    }
}
?>