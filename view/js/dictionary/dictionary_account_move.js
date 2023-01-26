import { controller_path_builder } from '../functions/path_builder.js'

function controller_url_move(controller) {
    const url_Account = {
        //load: controller_path_builder("account/load_account.php"),
        new: controller_path_builder('move/new_move.php'),
        //modify: controller_path_builder('account/update_account.php'),
        //delete: controller_path_builder('account/delete_account.php')
    }
    return url_Account[controller] ?? alert('error url del controller account no existe');
}

function controller_url_move_List(controller) {
    const url_account_List = {
        //all: controller_path_builder('account/lists/load_account_list.php'),
        //load_from_user : controller_path_builder('account/lists/load_accounts_from_user.php'),
        //load_own : controller_path_builder('account/lists/load_own_accounts.php'),
    }
    return url_account_List[controller] ?? alert('error url del controller account no existe');
}

export { controller_url_move , controller_url_move_List }
