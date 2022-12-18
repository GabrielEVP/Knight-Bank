import { user_hist_class } from "./user_hist_class.js";

class user_hist_list {

    user_hist_list = new Array();

    // añade en la ultima posicion del array //
    add_user_Hist(user_hist = new user_hist_class()) {
        this.produktu_list.push(user_hist);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_user_Hist() {
        this.user_hist_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_user_Hist() {
        while(this.user_hist_list.length != 0) {
            this.delete_user_Hist();
        }
    }

    // visualiza por consola el contenido del array //
    show_user_hist_List() {
        for (const iterator of this.user_hist_list) {
            console.log(iterator);
        }
    }

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_user_Hist(generic_array) {
        for (const data_array of generic_array) {
            this.add_user_Hist(Object.assign(new user_hist_class(), data_array));
        }
    }

    // carga el contenido asincronamente de un json al array casteandolo a objetos  //
    async fetch_load_user_Hist(url) {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            this.cast_array_to_user_Hist(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_user_hist_set_Data(url, data) {
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

    async fetch_set_data_load_user_Hist(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json();
            this.cast_array_to_user_Hist(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

}

export { user_hist_list };
