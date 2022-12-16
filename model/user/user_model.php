<?php

include_once ("user_class.php"); 
//include_once ('../database/query.php');
include_once (str_replace("user", "", __DIR__  . "database\query.php"));
include_once (str_replace("user", "", __DIR__  . "function.php")); 


class user_model extends user_class {

    private $objuserType;

    public function insert_user () {
        return insert("insert into user ( gmail, NIF, name, surname, password, admin) values ( '$this->gmail', '$this->NIF', '$this->name', '$this->surname', '$this->password', $this->admin)");
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
                if(password_verify($this->password,$user->getPassword())) {
                    $this->set_full_user($user);
                    return "ok";
                } else {
                    return "credenciales incorrectas";
                }
            } else {
                return "usuario baneado";
            }
        } else {
            return "usuario no encontrado";
        }   
    }

    public function login_fail () {
        update("update user set login_tries = login_tries - 1 WHERE NIF = '$this->NIF'");
        return single_row_array_select("SELECT login_tries FROM user WHERE NIF = '$this->NIF'")['login_tries'];
    }

    public function unBan () {
        return update("update user set login_tries = 3 WHERE NIF = '$this->NIF'");
    }
}

?>