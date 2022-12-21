class move_class {

    constructor(id_move, id_move_type, dateTime) {
        this.id_move = id_move;
        this.id_move_type = id_move_type;
        this.dateTime = dateTime;
    }

    // method //
    show_move() {
        console.log(this);
    }

    // enviar informacion al controlador //
    async fetch_set_data_Move(url, data) {
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
    async fetch_load_Move(url, data) {
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

export { move_class };