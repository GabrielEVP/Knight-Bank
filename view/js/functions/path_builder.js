function controller_path_builder(controller_path) {
    const path = window.location.pathname;
    const path_array = path.split("/");
    const array_length = path_array.length;
    var erase_path = "";
    for (let i = array_length - 1; i >= 0; i--) {
            erase_path = path_array[i] + "/" + erase_path;
        if (path_array[i] == 'view') {  
            break;
        } 
    }
    return path.replace(erase_path.slice(0, -1), "") + "controller/" + controller_path;
}

export { controller_path_builder }