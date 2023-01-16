import { controller_path_builder } from '../../functions/path_builder.js'

function controller_url_User(controller) {
    const url_user = {
        new: controller_path_builder('user/new_user.php'),
        modify: controller_path_builder('user/update_user.php'),
        ban: controller_path_builder('user/ban_user.php'),
        delete: controller_path_builder('user/delete_user.php'),
        unban: controller_path_builder('user/unban_user.php'),
        login: controller_path_builder('user/login.php'),
        logout: controller_path_builder('user/logout.php'),
        load: controller_path_builder('user/load_user.php'),
        login_verify: controller_path_builder('user/logged_verify.php'),
        delete_image: controller_path_builder('user/delete_profile_image.php'),
    }
    return url_user[controller] ?? alert('error url del controller user no existe');
    
}

function controller_url_user_List(controller) {
    const url_user_list = {
        all: controller_path_builder('user/lists/load_user_list.php'),
        admin: controller_path_builder('user/lists/load_admin_list.php'),
        user: controller_path_builder('user/lists/load_active_user_list.php'),
        inactive: controller_path_builder('user/lists/load_inactive_user_list.php')
    }
    return url_user_list[controller] ?? alert('error url del controller userlist no existe');
}



export { controller_url_User , controller_url_user_List }
