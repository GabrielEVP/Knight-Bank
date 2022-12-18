import { user_class } from "./user_class.js";

class user_list {

    user_list = new Array();

    // añade en la ultima posicion del array //
    add_User(user = new user_class()) {
        this.user_list.push(user);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_User() {
        this.user_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_User() {
        while(this.user_list.length != 0) {
            this.delete_User();
        }
    }

    // visualiza por consola el contenido del array //
    show_user_List() {
        for (const iterator of this.user_list) {
            console.log(iterator);
        }
    }

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_User(generic_array) {
        for (const data_array of generic_array) {
            this.add_User(Object.assign(new user_class(), data_array));
        }
    }
    
}

export { user_list };
