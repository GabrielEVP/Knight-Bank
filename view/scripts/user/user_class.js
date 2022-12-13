class produktu_class {

    constructor(id_produktuak, nombre, tipo, precio, cantidad, foto) {
        this.id_produktuak = id_produktuak;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.foto = foto;
    }

    // method //
    show_Produktu() {
        console.log(this);
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

}

export { produktu_class };