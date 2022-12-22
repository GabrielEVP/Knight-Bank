function controller_url_Account(controller) {
    const url_Account = {
        load: controller_path_builder("account/load_account.php"),
        new: controller_path_builder('account/new_account.php'),
        modify: controller_path_builder('account/update_account.php'),
        delete: controller_path_builder('account/delete_account.php')
    }
    return url_Account[controller] ?? alert('error url del controller account no existe');
}

function controller_url_account_List(controller) {
    const url_account_List = {
        all: controller_path_builder('account/lists/load_account_list.php'),
        load_from_user : controller_path_builder('account/load_accounts_from_user.php'),
    }
    return url_account_List[controller] ?? alert('error url del controller account no existe');
}

function controller_path_builder (controller_path) {
    const path = window.location.pathname;
    const path_array = path.split("/");
    const array_length = path_array.length;
    var erase_path = "";
    for (let i = array_length - 1; i >= 0; i--) {
        if (path_array[i] == 'view') {
            break;
        } else {
            erase_path = path_array[i] + "/" + erase_path;
        }
    }
    erase_path = "view/" + erase_path;
    return path.replace(erase_path.slice(0, -1), "") + "controller/" + controller_path;
    
}

export { controller_url_Account , controller_url_account_List }
