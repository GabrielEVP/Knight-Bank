function controller_url_Account(controller) {
    const url_Account = {
        load: '/banca/controller/account/load_account.php',
        new: '/banca/controller/account/new_account.php',
        modify: '/banca/controller/account/update_account.php',
        delete: '/banca/controller/account/delete_account.php'
    }
    return url_Account[controller] ?? alert('error url del controller account no existe');
}

function controller_url_account_List(controller) {
    const url_account_List = {
        all: '/banca/controller/account/lists/load_account_list.php',
    }
    return url_account_List[controller] ?? alert('error url del controller account no existe');
}

export { controller_url_Account , controller_url_account_List }
