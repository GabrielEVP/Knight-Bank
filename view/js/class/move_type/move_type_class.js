class move_type_class {

    constructor(id_moveType, name) {
        this.id_moveType = id_moveType;
        this.name = name;
    }

    // method //
    show_move_Type() {
        console.log(this);
    }

    // enviar informacion al controlador //
    async fetch_set_data_move_Type(url, data) {
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

    // recibir datos del servidor //
    async fetch_load_move_Type(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json()
        } catch(err) {
            alert(err);
        }
    }

}

export { move_type_class };