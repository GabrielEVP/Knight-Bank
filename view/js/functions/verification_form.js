function verification_Email (email) {
   const expReg =  /^(\W|^)[\w.\-]{0,25}@(yahoo|hotmail|gmail)\.com(\W|$)/;
   return expReg.test(email) ? true : false;
}

function verification_Dni (dni) {
    const expNIF =  /^[a-z]./;
    const expDNI =  /^.[a-z]/;
    longitud = dni.length;
    if (expReg.test(dni) || expReg.test(dni) && longitud );
    return expReg.test(dni) ? true : false;
}

export { verification_Dni , verification_Email }