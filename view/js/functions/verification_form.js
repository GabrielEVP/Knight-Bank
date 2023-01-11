function verification_Email (email) {
   const expEMAIL =  /^(\W|^)[\w.\-]{0,25}@(yahoo|hotmail|gmail)\.com(\W|$)/;
   return expEMAIL.test(email) ? true : false;
}

function verification_Dni (dni) {
    const expNIF =  /^[a-z]./;
    const expDNI =  /^.*[a-z]$/;

    if (expNIF.test(dni.toLowerCase()) && dni.length == 9  || expDNI.test(dni.toLowerCase()) && dni.length == 9 ) {
        return true
    } else {
        return false
    }
}

function verification_Phone (phone) {
    return phone.length == 9 ?? false;
}

export {verification_Phone , verification_Dni , verification_Email }