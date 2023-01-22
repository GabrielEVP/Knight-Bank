$(".menu_btn").click(() => {
    document.querySelector(".sidemenu").classList.toggle("menu_expanded");
    document.querySelector(".sidemenu").classList.toggle("menu_collapsed");
    document.querySelector('body').classList.toggle("body_expanded")
    document.querySelector('body').classList.toggle("body_phone")
    set_SaveConfiguration_Navbar(document.querySelector(".sidemenu").classList, document.querySelector('body').classList);
})

function set_SaveConfiguration_Navbar (class_sidemenu, class_body) {
    localStorage.setItem('menu_status', class_sidemenu);
    localStorage.setItem('menu', class_body );
}

function get_SaveConfiguration_Navbar (sidemenu_scope, body_scope) {
    sidemenu_scope = localStorage.getItem('menu_status')
    body_scope = localStorage.getItem('menu')
}

export { get_SaveConfiguration_Navbar }

