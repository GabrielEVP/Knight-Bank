async function fetch_get_Data(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch(err) {
        console.error(err);
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
        return await res.json();
    } catch(err) {
        console.error(err);
    }
}

function login_Process (status,callback) {
    const Login_Status = {
        true : () => {
            callback(localStorage.getItem('menu_status'), localStorage.getItem('menu'));
            $('body').removeClass('hidden');
        }, 

        false : () => location.href = '../web/login.html'
    }
    return Login_Status[status] ? Login_Status[status](callback) : console.error(status);
}

function logout_Process (status) {
    const Logout_Status = {
        true : () => location.href = '../web/login.html', 
        false : () => console.error (status)
    }
    return Logout_Status[status] ? Logout_Status[status]() : console.error(status);
}


export { fetch_get_Data , fetch_set_Data, login_Process,  logout_Process  }