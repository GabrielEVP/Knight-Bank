import {controller_url_User} from '../class/user/dictionary_user.js'

async function fetch_get_Data(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch(err) {
        console.log(err)
    }
}

async function fetch_set_Data(url, data) {
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

async function login_verify() {
    try {
        const res = await fetch(controller_url_User('login_verify'));
        const result = await res.json();

        if(result.logged == true && result.admin == 1) {
            console.log('admin')
        } else if (result.logged == true && result.admin == 0) {
            location.href = "../../../index.html"
        } else {
            location.href = "../../../index.html"
        }
    } catch(err) {
        console.log(err)
    }
}


export { fetch_get_Data , fetch_set_Data, login_verify }