class account_move_class {

    constructor(id_acccount_move, IBAN, id_move, amount) {
        this.id_acccount_move = id_acccount_move;
        this.IBAN = IBAN;
        this.id_move = id_move;
        this.amount = amount;
    }

    // method //
    show_account_Move() {
        console.log(this);
    }

    // enviar informacion al controlador //
    async fetch_set_data_account_Move(url, data) {
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
    async fetch_load_account_Move(url, data) {
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

export { account_move_class };