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
    var path = window.location.pathname;
    return path.replace("view/js/class/account/dictionary_account.js","") + "/controller/" + controller_path;
}

export { controller_url_Account , controller_url_account_List }
