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

function login_verify() {
    fetch(controller_url_User('login_verify')).then(res => res.json()).then(result => {
        console.log(result.user)
        if (result.logged !== true) {
            location.href = '../web/login.html'
        } else {
           return result.user;
        }   
    }).catch(error => console.error('Error status:', error));	   
}


export { fetch_get_Data , fetch_set_Data, login_verify }