class user_class {

    constructor(id_user, gmail, NIF, name, surname, password, admin, active) {
        this.id_user = id_user;
        this.gmail = gmail;
        this.NIF = NIF;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.admin = admin;
        this.active = active;
    }

    // method //
    show_User() {
        console.log(this);
    }

    // enviar informacion al controlador //
    async fetch_set_data_User(url,data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json()
            return datos;
        } catch(err) {
            alert(err);
        }
    }

    // recibir datos del servidor //
    async fetch_load_User(url,data) {
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

    //  //
    // async login() {
    //     var data = ['nif'=this.nif,'password'=this.password];
    //     try {
    //         const res = await fetch (
    //             url, {
    //             method: 'POST',
    //             body: JSON.stringify(data), 
    //             headers:{'Content-Type': 'application/json'}
    //         })
    //         const datos = await res.json()
    //     } catch(err) {
    //         alert(err);
    //     }
    // }

}

export { user_class };