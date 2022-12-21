<?php

include_once ('conect_data.php');

class conect extends conect_data {

    public $link;

    public function OpenConnect() {

        try {
            $this->link = new mysqli($this->host,$this->userbbdd,$this->passbbdd,$this->ddbbname);
        } catch(Exception $e) {
            echo $e->getMessage();
        }
        
        $this->link->set_charset("utf8");

    }
    
    public function CloseConnect() {
        mysqli_close ($this->link);
    }

}

?>