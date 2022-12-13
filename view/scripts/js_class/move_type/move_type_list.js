import { move_type_class } from "./move_type_class.js";

class move_type_list_class {

    move_type_list = new Array();

    // añade en la ultima posicion del array //
    add_move_Type(move_type = new move_type_class()) {
        this.move_type_list.push(move_type);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_move_Type() {
        this.move_type_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_move_Type() {
        while(this.move_type_list.length != 0) {
            this.delete_move_Type();
        }
    }

    // visualiza por consola el contenido del array //
    show_move_type_List() {
        for (const iterator of this.move_type_list) {
            console.log(iterator);
        }
    }

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_move_Type(generic_array) {
        for (const data_array of generic_array) {
            this.add_User(Object.assign(new move_type_class(), data_array));
        }
    }

    // carga el contenido asincronamente de un json al array casteandolo a objetos  //
    async fetch_load_move_Type(url) {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            this.cast_array_to_move_Type(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_move_Type_set_Data(url, data) {
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
    
    async fetch_set_data_load_move_Type(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json();
            this.cast_array_to_move_Type(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

}

export { move_type_list_class };
