class account_class {

    constructor(IBAN, balance, id_user, id_user_hist, active) {
        this.IBAN = IBAN;
        this.balance = balance;
        this.id_user = id_user;
        this.id_user_hist = id_user_hist;
        this.active = active;
    }

    // method //
    show_Account() {
        console.log(this);
    }

    // enviar informacion al controlador //
    async fetch_set_data_Account(url, data) {
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
    async fetch_load_Account(url, data) {
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

export { account_class };