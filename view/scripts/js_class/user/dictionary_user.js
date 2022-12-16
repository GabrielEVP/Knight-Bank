function controller_url_User(controller) {
    const url_user = {
        new: '/banca/controller/user/new_user.php',
        login: '/banca/controller/user/login.php',
        logged: '/banca/controller/user/logged_verify',
        load: '/banca/controller/user/load_user.php'
    }
    return url_user[controller] ?? alert('error url del controller user no existe');
}

function controller_url_user_List(controller) {
    const url_user_list = {
        all: '/banca/controller/user/lists/load_user_list.php',
        admin: '/banca/controller/user/lists/load_admin_list.php',
        user: '/banca/controller/user/lists/load_active_user_list.php',
        inactive: '/banca/controller/user/lists/load_inactive_list.php'
    }
    return url_user_list[controller] ?? alert('error url del controller userlist no existe');
}

export { controller_url_User , controller_url_user_List }
