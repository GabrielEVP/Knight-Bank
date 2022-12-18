class user_class {

    constructor(id_user, gmail, NIF, name, surname, password, admin, login_tries) {
        this.id_user = id_user;
        this.gmail = gmail;
        this.NIF = NIF;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.admin = admin;
        this.login_tries = login_tries;
    }

    // method //
    show_User() {
        console.log(this);
    }

    load_input_Value() {
        $('#nif').val(this.NIF);
        $('#name').val(this.name);
        $('#surname').val(this.surname);
        $('#gmail').val(this.gmail);
        $('#password').val(this.password);
    }

    asigment_input() {
        this.NIF = $('#nif').val();
        this.name = $('#name').val();
        this.surname = $('#surname').val();
        this.gmail = $('#gmail').val();
        this.password = $('#password').val();
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
            return await res.json();
        } catch(err) {
            alert(err);
        }
    }

    // recibir datos del servidor //
    async fetch_set_load_User(url,data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            return await res.json()
        } catch(err) {
            alert(err);
        }
    }
    
}

export { user_class };