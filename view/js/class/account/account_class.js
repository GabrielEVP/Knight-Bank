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

    load_input_Value() {
        $('#IBAN').val(this.IBAN);
        $('#balance').val(this.balance);
    }

    asigment_input() {
        this.IBAN = $('#IBAN').val();
        this.balance = $('#balance').val();
    }

}

export { account_class };