import { produktu_class } from "./produktu_class.js";

class produktu_list {

    produktu_list = new Array();

    // añade en la ultima posicion del array //
    add_Produktu(produktu = new produktu_class()) {
        this.produktu_list.push(produktu);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_Produktu() {
        this.produktu_list.pop();
    }

    // bucle que elima todo los objeto del array //
    delete_all_Produktu() {
        while(this.produktu_list.length != 0) {
            this.delete_Produktu();
        }
    }

    // visualiza por consola el contenido del array //
    show_produktu_List() {
        for (const iterator of this.produktu_list) {
            console.log(iterator);
        }
    }

    // valida por id del usuario y entrega un nuevo objeto de tipo usuarios //
    validation_Idproduktuak(id_produktuak) {
        for (const iterator of this.produktu_list) {
            if (id_produktuak == iterator.id_produktuak) {
                return new produktu_class(iterator.id_produktuak, iterator.nombre , iterator.tipo , iterator.precio , 1 , iterator.foto); 
            }
        }
    }

    // valida por id del usuario y entrega un nuevo objeto de tipo usuarios //
    sum_Cantidad(id_produktuak) {
        for (const iterator of this.produktu_list) {
            if (id_produktuak == iterator.id_produktuak) {
                iterator.cantidad = iterator.cantidad + 1;  
            }
        }
    }

     // valida por id del usuario y entrega un nuevo objeto de tipo usuarios //
    delete_Cantidad(id_produktuak) {
        for (const iterator of this.produktu_list) {
            if (id_produktuak == iterator.id_produktuak) {
                iterator.cantidad = iterator.cantidad - 1;  
                if (iterator.cantidad <= 0)  this.delete_Produktu();
            }
        }
    }

    asignament_to_input_Value(id_produktuak, id, nombre, tipo, precio, cantidad) {
        for (const iterator of this.produktu_list) {
            if (id_produktuak == iterator.id_produktuak) {
                $(id).val(iterator.id_produktuak);
                $(nombre).val(iterator.nombre);
                $(tipo).val(iterator.tipo);
                $(precio).val(iterator.precio);
                $(cantidad).val(iterator.cantidad);
            }
        }
    }

    // carga el contenido asincronamente de un json al array casteandolo a objetos  //
    // si quieres usar esta promesa en el mismo intervalo de tiempo en el que el codigo esta interpretandose tienes que usar un 
    // 'setTimeout(() =>' ya que la promesa tarda en llegar un aproximado de como minimo 0.30s despues de que el codigo esta complemente interpretado //
    async fetch_Produktu(url) {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            this.cast_array_to_Produktu(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_produktu_Data(url,data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json();
            this.cast_array_to_Produktu(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_produktu_set_Data(url,data) {
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

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_Produktu(generic_array) {
        for (const data_array of generic_array) {
            this.add_Produktu(Object.assign(new produktu_class(), data_array));
        }
    }

     // es igual que el fecth solo que segun documentacion es mejor que el fetch ya que esto el fecth simplemente es un metodo en cambio
    // axios es una libreria de codigo encargada para las promesas y tiene muchisimas mas funcionales y una sintaxis mas limpia //
    async axios_load_Produktu(url) {
        try {
            const res = await axios(url);
            this.cast_array_to_Produktu(res.data.list);
        } catch(err) {
            console.log(err)
        }
    }

}

export { produktu_list };
