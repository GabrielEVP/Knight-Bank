import { user_class } from "./produktu_class.js";

class user_list {

    user_list = new Array();

    // añade en la ultima posicion del array //
    add_User(user = new user_class()) {
        this.produktu_list.push(user);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_User() {
        this.produktu_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_User() {
        while(this.produktu_list.length != 0) {
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
            this.add_Produktu(Object.assign(new produktu_class(), data_array));
        }
    }

    // carga el contenido asincronamente de un json al array casteandolo a objetos  //
    async fetch_load_User(url) {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            this.cast_array_to_User(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_produktu_set_Data(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json()
            alert(datos.error);
        } catch(err) {
            alert(err);
        }
    }
5
    async fetch_set_data_load_User(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json();
            this.cast_array_to_User(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

}

export { user_list };
