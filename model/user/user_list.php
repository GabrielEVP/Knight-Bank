<?php 
include_once ("user_model.php"); 
include_once (str_replace("user", "", __DIR__  . "database/query.php")); 
include_once (str_replace("user", "", __DIR__  . "function.php")); 
include_once (str_replace("user", "", __DIR__  . "standard_class.php")); 
class user_list extends standard_class{

    private $user_list;

    /**
     * Get the value of user_list
     */
    public function getUserList()
    {
        return $this->user_list;
    }

    /**
     * Set the value of user_list
     */
    public function setUserList($user_list): self
    {
        $this->user_list = $user_list;

        return $this;
    }


    public function get_user_list_from_BBDD() {
        $select = select_Object("SELECT * FROM user");
        $this->user_list = cast_array($select, new user_model());

        return $this->user_list;
    }

    public function search_list_from_DDBB ($search_string) {
        $select = select_Object("SELECT * FROM user");

        $this->user_list = array();
        foreach ($select as $user) {
            $check = false;
            $search_sound_code = generate_sound_code($search_string);
            $check |= (str_contains($user->NIF,$search_string));

            $check |= (str_contains(generate_sound_code($user->name),$search_sound_code));
            $check |= (str_contains(generate_sound_code($user->surname),$search_sound_code));
            $check |= (str_contains(generate_sound_code($user->gmail),$search_sound_code));

            if ($check) {
                array_push($this->user_list,cast($user,new user_model()));
            }
        }
        return $this->user_list;
    }


    public function get_active_users() {
        $result_list = array();
           foreach ($this->user_list as $user) {
                if ($user->getLogintries() > 0 && $user->getAdmin() == 0) {
                    array_push($result_list,$user->getObjvars());
                }
           }
        return $result_list;
    }

    public function get_inactive_users() {
        $result_list = array();
           foreach ($this->user_list as $user) {
                if ($user->getLogintries() == 0) {
                    array_push($result_list,$user->getObjvars());
                }
           }
        return $result_list;
    }

    public function get_administrators() {
        $result_list = array();
           foreach ($this->user_list as $user) {
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
        $array_user_list = $this->getArrayObjVars("user_list");

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
        $array_user_list = $this->getArrayObjVars("user_list");

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
        $array_user_list = $this->getArrayObjVars("user_list");

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
        $array_user_list = $this->getArrayObjVars("user_list");

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
                    COUNT(a.id_account) as 'account_number',
                    SUM(a.balance) as 'total_balance',
                    COUNT(am.id_account_move) as 'move_number',
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

    //version comprimide pero menos eficiente que las anteriores listas (O)n^2 vs (O)n^3
    public function get_extra_list($sql_where = "") {
        $sql = "SELECT
                u.id_user as 'id_user',
                COUNT(a.id_account) as 'account_number',
                SUM(a.balance) as 'total_balance',
                COUNT(am.id_account_move) as 'move_number',
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
        $array_user_list = $this->getArrayObjVars("user_list");
        $user_id_list = array_column($array_user_list,"id_user");

        $result = array();
        $array_length = count($extra_data_array);
        for ($i = 0; $i<$array_length; $i++) {

            if ( ($position = array_search($extra_data_array[$i]["id_user"],$user_id_list)) !== false) {

                $array_user_list[$position]['foto'] = refactor_profile_img_path($array_user_list[$position]['foto']);
                $array_user_list[$position]['account_number'] = $extra_data_array[$position]['account_number'];
                $array_user_list[$position]['total_balance'] = ($extra_data_array[$position]['total_balance'] != null)? $extra_data_array[$position]['total_balance'] : "0";
                $array_user_list[$position]['move_number'] = $extra_data_array[$position]['move_number'];
                $array_user_list[$position]['last_move'] = ($extra_data_array[$position]['last_move'] != null)? $extra_data_array[$position]['last_move'] : "No hay" ;
    
                array_push($result,$array_user_list[$position]);
            }
        }

        return $result;
    }

}
?>