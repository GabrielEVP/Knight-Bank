import { account_class } from "./account_class.js";

class account_list {

    account_list = new Array();

    // añade en la ultima posicion del array //
    add_Account(account = new account_class()) {
        this.account_list.push(account);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_Account() {
        this.account_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_Account() {
        while(this.account_list.length != 0) {
            this.delete_Account();
        }
    }

    // visualiza por consola el contenido del array //
    show_Account_List() {
        for (const iterator of this.account_list) {
            console.log(iterator);
        }
    }

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_Account(generic_array) {
        for (const data_array of generic_array) {
            this.add_Account(Object.assign(new account_class(), data_array));
        }
    }

}

export { account_list };
