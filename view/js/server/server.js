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

export { fetch_get_Data , fetch_set_Data }