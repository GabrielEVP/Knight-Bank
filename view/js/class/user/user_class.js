class user_class {

    constructor(id_user, gmail, NIF, foto, name, surname, password, admin, login_tries) {
        this.id_user = id_user;
        this.gmail = gmail;
        this.NIF = NIF;
        this.foto = foto;
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
    
}

export { user_class };