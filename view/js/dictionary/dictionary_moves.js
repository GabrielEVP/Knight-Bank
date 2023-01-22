import { controller_path_builder } from '../functions/path_builder.js'

function controller_url_moves(controller) {
    const url_Move = {
        //load: controller_path_builder("account/load_account.php"),
        new: controller_path_builder('move/new_move.php'),
        //modify: controller_path_builder('account/update_account.php'),
        //delete: controller_path_builder('account/delete_account.php')
    }
    return url_Move[controller] ?? alert('error url del controller account no existe');
}

function controller_url_moves_List(controller) {
    const url_move_List = {
        //all: controller_path_builder('account/lists/load_account_list.php'),
        //load_from_user : controller_path_builder('account/lists/load_accounts_from_user.php'),
        load_own : controller_path_builder('move/lists/load_own_moves.php'),
    }
    return url_move_List[controller] ?? alert('error url del controller account no existe');
}

export { controller_url_moves , controller_url_moves_List }
