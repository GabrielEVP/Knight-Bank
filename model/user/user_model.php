<?php

include_once ("user_class.php"); 
include_once ("model/database/query.php");
include_once ("model/function.php"); 

class user_model extends user_class {

    private $objuserType;

    public function insert_user () {
        return insert("insert into user ( gmail, NIF, name, surname, password, admin, active) values ( '$this->gmail', '$this->NIF', '$this->name', '$this->surname', '$this->password', $this->admin, $this->active)");
    }

    public function delete_user () {
       return delete('user',$this->id);
    }

    public function update_user () {
        return update("update user set gmail = $this->gmail, NIF= '$this->NIF',  WHERE id_user = $this->id_user");
    }

    public function get_user ($id) {
       $select = select_Object("select * from user where id = $id");
       $user = cast_array($select, new user_model())[0];
       return $user;
    }

    public function set_full_user($new_user) {
        $vars = get_object_vars($new_user);
        foreach ($vars as $key => $valor) {
            $setter = "set" . ucfirst($key) . "(" . $valor . ")";
            $this->$setter;
        }
    }

    public function login() {
        // $select = select_Object("select * from user where gmail = $gmail");
        // $user = cast_array($select, new user_model())[0];

        $sql = "select * from user where NIF = '$this->NIF'";
        $user = single_row_object_select($sql,new user_model());
        
                
        
        if ($user != null) {
            if ($user->getLogintries() > 0) {

            }
            
            if(password_verify($this->password,$user->getPassword())) {
                $this->set_full_user($user);
            } else {

            }
        } else {
            return false;
        } 
    

       
    }
}

?>