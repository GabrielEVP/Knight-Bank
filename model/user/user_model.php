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
//------------------------------------------------------------------
//CRUD (SIN SELECT)
//------------------------------------------------------------------
    //**********************************/
    //BASICO
    public function insert_user () {
        return insert("insert into user ( gmail, NIF, name, surname, password, foto, admin) values ( '$this->gmail', '$this->NIF', '$this->name', '$this->surname', '$this->password', '0_default.png', 0)");
    }

    public function delete_user () {
       return delete('user',$this->id_user,'id_user');
    }

    public function update_user () {
        return update("update user set gmail = '$this->gmail', NIF= '$this->NIF', name= '$this->name', surname= '$this->surname', password= '$this->password' WHERE id_user = $this->id_user");
    }
    //*********************************/
    //EXTRA

    public function ban () {
        return update("update user set login_tries = 0 WHERE id_user = '$this->id_user'");
    }

    public function unBan () {
        return update("update user set login_tries = 3 WHERE id_user = '$this->id_user'");
    }

    public function reset_profile_image() {
        return update("update user set foto= '0_default.png' WHERE id_user = $this->id_user");
    }

    public function change_password() {
        return update("update user set password= '$this->password' WHERE id_user = $this->id_user");
    }
//------------------------------------------------------------------
//OBTENCION DE DATOS DESDE LA BBDD
//------------------------------------------------------------------

    public function get_user ($id) {
       $select = select_Object("select * from user where id_user = $id");
       $user = cast_array($select, new user_model())[0];
       $this->set_full_object($user);
       return $user;
    }

    public function get_id_by_NIF () {
        $select = single_row_array_select("SELECT id_user FROM user WHERE NIF = '$this->NIF'");
        $this->id_user = $select['id_user'];
        return $this->id_user;
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
//------------------------------------------------------------------
//SISTEMA DE LOGIN
//------------------------------------------------------------------

    public function login() {
        $sql = "select * from user where NIF = '$this->NIF'";
        $user = single_row_object_select($sql,new user_model());      
        
        if ($user != null) {
            if ($user->getLogintries() > 0) {
                if(password_verify($this->password,$user->getPassword())) {
                    $this->set_full_object($user);
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
//------------------------------------------------------------------
//MANIPULACION DEL OBJETO (SIN BBDD)
//------------------------------------------------------------------



//------------------------------------------------------------------
//LISTAS
//------------------------------------------------------------------

    //------------------------------------------------------------------
    //BUSQUEDAS EN LA BBDD
    //------------------------------------------------------------------

    public function get_user_list_from_BBDD() {
        $select = select_Object("SELECT * FROM user");
        $user_list = cast_array($select, new user_model());

        return $user_list;
    }

    public function search_list_from_DDBB ($search_string) {
        $select = select_Object("SELECT * FROM user");

        $user_list = array();
        foreach ($select as $user) {
            $check = false;
            $search_sound_code = generate_sound_code($search_string);
            $check |= (str_contains($user->NIF,$search_string));

            $check |= (str_contains(generate_sound_code($user->name),$search_sound_code));
            $check |= (str_contains(generate_sound_code($user->surname),$search_sound_code));
            $check |= (str_contains(generate_sound_code($user->gmail),$search_sound_code));

            if ($check) {
                $new_user = cast($user,new user_model());
                array_push($user_list,get_object_vars($new_user));
            }
        }
        return $user_list;
    }

    //------------------------------------------------------------------
    //FILTROS DE LA LISTA
    //------------------------------------------------------------------

    public function get_active_users() {
        $user_list = $this->get_user_list_from_BBDD();
        $result_list = array();
           foreach ($user_list as $user) {
                if ($user->getLogintries() > 0 && $user->getAdmin() == 0) {
                    array_push($result_list,$user->getObjvars());
                }
           }
        return $result_list;
    }

    public function get_inactive_users() {
        $user_list = $this->get_user_list_from_BBDD();
        $result_list = array();
           foreach ($user_list as $user) {
                if ($user->getLogintries() == 0) {
                    array_push($result_list,$user->getObjvars());
                }
           }
        return $result_list;
    }

    public function get_administrators() {
        $user_list = $this->get_user_list_from_BBDD();
        $result_list = array();
           foreach ($user_list as $user) {
                if ($user->getAdmin() > 0) {
                    array_push($result_list,$user->getObjvars());
                }
           }
        return $result_list;
    }

    //------------------------------------------------------------------
    //LISTAS CON DATOS EXTRA PARA LAS TARJETAS DE USUARIO
    //------------------------------------------------------------------

    public function get_full_extra_list() {
        $extra_data_array = $this->get_extra_data();
        $array_user_list =  $this->get_any_ArrayObjVars($this->get_user_list_from_BBDD());

        $array_length = count($array_user_list);
        for ($i = 0; $i < $array_length; $i++) {//las dos listas se obtienen ordenadas de la misma manera, podemos usar los mismos indices
            $array_user_list[$i]['foto'] = refactor_profile_img_path($array_user_list[$i]['foto']);
            $array_user_list[$i]['account_number'] = $extra_data_array[$i]['account_number'];
            $array_user_list[$i]['total_balance'] = ($extra_data_array[$i]['total_balance'] != null)? $extra_data_array[$i]['total_balance'] : "0";
            $array_user_list[$i]['move_number'] = $extra_data_array[$i]['move_number'];
            $array_user_list[$i]['last_move'] = ($extra_data_array[$i]['last_move'] != null)? $extra_data_array[$i]['last_move'] : "No hay" ;
        }
        unset($array_length);

        return $array_user_list;
    }

    public function get_administrator_extra_list() {
        $extra_data_array = $this->get_extra_data();
        $array_user_list =  $this->get_any_ArrayObjVars($this->get_user_list_from_BBDD());

        $result = array();
        $array_length = count($array_user_list);
        for ($i = 0; $i < $array_length; $i++) { //las dos listas se obtienen ordenadas de la misma manera, podemos usar los mismos indices
            if (!$array_user_list[$i]['admin'] > 0) {
                continue;//nos saltamos a los que no son admin
            }
            $array_user_list[$i]['foto'] = refactor_profile_img_path($array_user_list[$i]['foto']);
            $array_user_list[$i]['account_number'] = $extra_data_array[$i]['account_number'];
            $array_user_list[$i]['total_balance'] = ($extra_data_array[$i]['total_balance'] != null)? $extra_data_array[$i]['total_balance'] : "0";
            $array_user_list[$i]['move_number'] = $extra_data_array[$i]['move_number'];
            $array_user_list[$i]['last_move'] = ($extra_data_array[$i]['last_move'] != null)? $extra_data_array[$i]['last_move'] : "No hay" ;

            array_push($result,$array_user_list[$i]);
        }
        unset($array_length);

        return $result;
    }

    public function get_inactive_extra_list() {
        $extra_data_array = $this->get_extra_data();
        $array_user_list =  $this->get_any_ArrayObjVars($this->get_user_list_from_BBDD());

        $result = array();
        $array_length = count($array_user_list);
        for ($i = 0; $i < $array_length; $i++) { //las dos listas se obtienen ordenadas de la misma manera, podemos usar los mismos indices
            if (!$array_user_list[$i]['login_tries'] == 0) {
                continue;//nos saltamos a los estan baneados (no tienen intentos de login)
            }
            $array_user_list[$i]['foto'] = refactor_profile_img_path($array_user_list[$i]['foto']);
            $array_user_list[$i]['account_number'] = $extra_data_array[$i]['account_number'];
            $array_user_list[$i]['total_balance'] = ($extra_data_array[$i]['total_balance'] != null)? $extra_data_array[$i]['total_balance'] : "0";
            $array_user_list[$i]['move_number'] = $extra_data_array[$i]['move_number'];
            $array_user_list[$i]['last_move'] = ($extra_data_array[$i]['last_move'] != null)? $extra_data_array[$i]['last_move'] : "No hay" ;

            array_push($result,$array_user_list[$i]);
        }
        unset($array_length);

        return $result;
    }

    public function get_active_extra_list() {
        $extra_data_array = $this->get_extra_data();
        $array_user_list = $this->get_any_ArrayObjVars($this->get_user_list_from_BBDD());

        $result = array();
        $array_length = count($array_user_list);
        for ($i = 0; $i < $array_length; $i++) { //las dos listas se obtienen ordenadas de la misma manera, podemos usar los mismos indices
            if (! ($array_user_list[$i]['login_tries'] > 0 && $array_user_list[$i]['admin'] == 0) ) {
                continue;//nos saltamos a los admin y a los baneados
            }
            $array_user_list[$i]['foto'] = refactor_profile_img_path($array_user_list[$i]['foto']);
            $array_user_list[$i]['account_number'] = $extra_data_array[$i]['account_number'];
            $array_user_list[$i]['total_balance'] = ($extra_data_array[$i]['total_balance'] != null)? $extra_data_array[$i]['total_balance'] : "0";
            $array_user_list[$i]['move_number'] = $extra_data_array[$i]['move_number'];
            $array_user_list[$i]['last_move'] = ($extra_data_array[$i]['last_move'] != null)? $extra_data_array[$i]['last_move'] : "No hay" ;

            array_push($result,$array_user_list[$i]);
        }
        unset($array_length);

        return $result;
    }

    private function get_extra_data($sql_where = "") {
        $sql = "SELECT
                    u.id_user,
                    COUNT(DISTINCT(a.id_account)) as 'account_number',
                    SUM(DISTINCT(a.balance)) as 'total_balance',
                    COUNT(DISTINCT(am.id_account_move)) as 'move_number',
                    DATE(MAX(m.dateTime)) as 'last_move'
                FROM 
                    account_move am
                RIGHT JOIN     	
                        account a 
                    ON
                        a.id_account = am.id_account
                RIGHT JOIN     	
                        user u 
                    ON
                        u.id_user = a.id_user
                LEFT JOIN
                        move m
                    ON
                        am.id_move = m.id_move
                " . $sql_where . "
                GROUP BY 
                    u.id_user;";
        return  select_array($sql);      
    }

    //version comprimida pero menos eficiente que las anteriores listas (O)n^2 vs (O)n^3
    public function get_extra_list($sql_where = "") {
        $sql = "SELECT
                u.id_user as 'id_user',
                COUNT(DISTINCT(a.id_account)) as 'account_number',
                SUM(DISTINCT(a.balance)) as 'total_balance',
                COUNT(DISTINCT(am.id_account_move)) as 'move_number',
                DATE(MAX(m.dateTime)) as 'last_move'
            FROM 
                account_move am
            RIGHT JOIN     	
                    account a 
                ON
                    a.id_account = am.id_account
            RIGHT JOIN     	
                    user u 
                ON
                    u.id_user = a.id_user
            LEFT JOIN
                    move m
                ON
                    am.id_move = m.id_move
            " . $sql_where . "
            GROUP BY 
                u.id_user;";

        $extra_data_array = select_array($sql);
        $array_user_list =  $this->get_any_ArrayObjVars($this->get_user_list_from_BBDD());
        $user_id_list = array_column($array_user_list,"id_user");

        $result = array();
        $array_length = count($extra_data_array);
        for ($i = 0; $i<$array_length; $i++) {

            if ( ($position = array_search($extra_data_array[$i]["id_user"],$user_id_list)) !== false) {

                $array_user_list[$position]['foto'] = refactor_profile_img_path($array_user_list[$position]['foto']);
                $array_user_list[$position]['account_number'] = $extra_data_array[$i]['account_number'];
                $array_user_list[$position]['total_balance'] = ($extra_data_array[$i]['total_balance'] != null)? $extra_data_array[$i]['total_balance'] : "0";
                $array_user_list[$position]['move_number'] = $extra_data_array[$i]['move_number'];
                $array_user_list[$position]['last_move'] = ($extra_data_array[$i]['last_move'] != null)? $extra_data_array[$i]['last_move'] : "No hay" ;
    
                array_push($result,$array_user_list[$position]);
            }
        }

        return $result;
    }


}

?>