// Comprueba por medio de expresiones regulares si el valor puesto en el input correo hotmail gmail o yahoo //
function verification_Email (email) {
   const expEMAIL =  /^(\W|^)[\w.\-]{0,25}@(yahoo|hotmail|gmail)\.com(\W|$)/;
   return expEMAIL.test(email) ? true : false
}

// Comprueba por medio de expresiones regulares si el valor puesto solamente tiene letras //
function verification_Name (name) {
    const expNAME =  /^[a-z]*.*[a-z]$/;
    return expNAME.test(name.toLowerCase()) ? true : false
}

// Comprueba por medio de expresiones regulares si el valor puesto en el input tiene 9 de longitud //
function verification_Phone (phone) {
    return phone.length == 9 ?? false;
}

// Comprueba por medio de expresiones regulares si el valor puesto en el input es un dni o un nie //
function verification_Dni (dni) {
    const expNIF =  /^[a-z]./;
    const expDNI =  /^.*[a-z]$/;
    return expNIF.test(dni.toLowerCase()) && dni.length == 9  || expDNI.test(dni.toLowerCase()) && dni.length == 9  ? true : false;
}

// Comprueba por medio de evento keypress a travez de codigo ASCII si el valor puesto en el input tiene lo que le pongas como condicion//
function keypress_condition (input,condition) {
    $(input).keypress(function(e) {
        var n = (e = e || window.event).keyCode || e.which, t = -1 != condition.indexOf(String.fromCharCode(n));
        (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
    })
}

// comprueba que todos los input necesario para la creacion de usuario sean validos sino retorna false y muestra en cliente //
const comprobatorConditionUser = () => {
    const avaible_nif = verification_Dni($('#nif').val());
    const avaible_email = verification_Email($('#gmail').val());
    const avaible_nombre = verification_Name($('#name').val());
    const avaible_surname = verification_Name($('#surname').val());
    comprobator_input(avaible_nif)("#nif");
    comprobator_input(avaible_email)("#gmail");
    comprobator_input(avaible_nombre)("#name");
    comprobator_input(avaible_surname)("#surname");
    return avaible_email && avaible_nombre && avaible_surname && avaible_nif ? true : false;
}

// Comprueba si un booleano por medio de las funciones verificacion si se cumplen o no para mostrarlo al usuario //
function comprobator_input (boolean) {
    const boleean_Case = {
        true : (input) => $(input).css({"border-color": ""},) ,
        false : (input) => $(input).css({"border-color": "red"},)
    }
    return boleean_Case[boolean] ?? alert('error no es un booleano');
}

// comprueba el status recibido por el php si es ok recarga la pagina //
function verification_status_proces (status) {
    const Process_Status = {
        ok : () => location.reload(), 
    }
    return Process_Status[status] ? Process_Status[status]() : console.error(status);
}

export { verification_Email, verification_Name , verification_Phone , verification_Dni , keypress_condition, comprobatorConditionUser , comprobator_input, verification_status_proces }