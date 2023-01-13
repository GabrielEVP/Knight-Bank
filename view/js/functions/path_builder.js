function controller_path_builder(controller_path) {
    const path = window.location.pathname;
    const path_array = path.split("/");
    const array_length = path_array.length;
    var erase_path = "";
    for (let i = array_length - 1; i >= 0; i--) {
        //if (path_array[i] == 'knigth%20bank') {
        //if (path_array[i] == 'banca') {
        if (path_array[i] == 'grupo2.zerbitzaria.net') {
            break;
        } else {
            erase_path = path_array[i] + "/" + erase_path;
        }
    }
    return path.replace(erase_path.slice(0, -1), "") + "controller/" + controller_path;
}

export { controller_path_builder }