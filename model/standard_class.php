<?php 
//*CLASE ESTANDAR DESDE LA QUE SE EXTIENDEN EL RESTO, CONTIENE FUNCIONES UNIVERSALES PARA CLASES*

include_once 'function.php';
class standard_class {
    
    //retorna un array con los datos de el objeto 
    public function getObjvars() {
        return get_object_vars($this);
    }

    //retorna un array bidimensional con los datos de un array de objetos (especificado en input en formato string)
    public function getArrayObjVars($arrayname) {
        $response_array = array();
        $getter =  create_getter($arrayname);
        // if (!is_array($this->$arrayname)) {
        //     return array();
        // }
        foreach ($this->$getter() as $object) {
            array_push($response_array,$object->getObjvars());
        }
        return $response_array;
    }


    public function set_full_object($new_object) {
        $vars = get_object_vars($new_object);
        foreach ($vars as $key => $valor) {
            $setter = create_setter($key);
            $this->$setter($valor);
        }
    }
}
?>