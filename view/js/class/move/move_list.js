import { move_class } from "./move_class.js";

class move_list_class {

    move_list = new Array();

    // añade en la ultima posicion del array //
    add_Move(move = new move_class()) {
        this.produktu_list.push(move);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_Move() {
        this.move_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_Move() {
        while(this.move_list.length != 0) {
            this.delete_Move();
        }
    }

    // visualiza por consola el contenido del array //
    show_move_List() {
        for (const iterator of this.move_list) {
            console.log(iterator);
        }
    }

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_Move(generic_array) {
        for (const data_array of generic_array) {
            this.add_Move(Object.assign(new move_class(), data_array));
        }
    }

    // carga el contenido asincronamente de un json al array casteandolo a objetos  //
    async fetch_load_Move(url) {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            this.cast_array_to_Move(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_move_set_Data(url, data) {
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
    
    async fetch_set_data_load_Move(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json();
            this.cast_array_to_Move(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

}

export { move_list_class };
