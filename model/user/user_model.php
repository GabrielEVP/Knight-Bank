<?php

include_once ("user_class.php"); 
include_once (str_replace("user", "", __DIR__  . "database/query.php"));
include_once (str_replace("user", "", __DIR__  . "function.php")); 


class user_model extends user_class {

    private $objuserType;

        /**
     * Get the value of objuserType
     */
    public function getObjuserType()
    {
        return $this->objuserType;
    }

    /**
     * Set the value of objuserType
     */
    public function setObjuserType($objuserType): self
    {
        $this->objuserType = $objuserType;

        return $this;
    }

    public function insert_user () {
        return insert("insert into user ( gmail, NIF, name, surname, password, foto, admin) values ( '$this->gmail', '$this->NIF', '$this->name', '$this->surname', '$this->password', '0_default.png', 0)");
    }

    public function delete_user () {
       return delete('user',$this->id_user,'id_user');
    }

    public function update_user () {
        return update("update user set gmail = '$this->gmail', NIF= '$this->NIF', name= '$this->name', surname= '$this->surname', password= '$this->password', foto= '$this->foto' WHERE id_user = $this->id_user");
    }

    public function get_user ($id) {
       $select = select_Object("select * from user where id_user = $id");
       $user = cast_array($select, new user_model())[0];
       $this->set_full_user($user);
       return $user;
    }

    public function set_full_user($new_user) {
        $vars = get_object_vars($new_user);
        foreach ($vars as $key => $valor) {
            $setter = create_setter($key);
            $this->$setter($valor);
        }
    }

    public function login() {
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
                return "banned";
            }
        } else {
            return "usuario no encontrado";
        }   
    }

    public function login_fail () {
        update("update user set login_tries = login_tries - 1 WHERE NIF = '$this->NIF'");
        return single_row_array_select("SELECT login_tries FROM user WHERE NIF = '$this->NIF'")['login_tries'];
    }

    public function get_id_by_NIF () {
        $select = single_row_array_select("SELECT id_user FROM user WHERE NIF = '$this->NIF'");
        $this->id_user = $select['id_user'];
        return $this->id_user;
    }

    public function ban () {
        return update("update user set login_tries = 0 WHERE id_user = '$this->id_user'");
    }

    public function unBan () {
        return update("update user set login_tries = 3 WHERE id_user = '$this->id_user'");
    }

    public function check_NIF_exists() {
        $select = single_row_array_select("SELECT id_user FROM user WHERE NIF = '$this->NIF'");
        if (empty($select)) {
            return false;
        } else {
            return true;
        }
    }

    public function check_NIF_change_available() {
        $select = single_row_array_select("SELECT id_user FROM user WHERE NIF = '$this->NIF' AND id_user <> '$this->id_user'");
        if (empty($select)) {
            return true;
        } else {
            return false;
        }
    }

}

?>