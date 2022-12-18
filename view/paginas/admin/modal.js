const btn = $(".menu_btn");
const menu = document.querySelector(".sidemenu");

btn.click(function(){
    menu.classList.toggle("menu_expanded");
    menu.classList.toggle("menu_collapsed");

    document.querySelector('body').classList.toggle("body_expanded")
})

function empty_input() {
    $('#nif').val('');
    $('#name').val('');
    $('#surname').val('');
    $('#gmail').val('');
    $('#password').val('');
}

function quit_Modal() {
    $(".modal-bg").css({
        "visibility": "hidden"
    });
    
    $(".modal-content").css({
        "visibility": "hidden",
        "transform": "scale(0)"
    });
    
    $(".borrar").css({
    "display": "none"
    });

    $(".modify").css({
    "display": "none"
    });

    $(".banear").css({
        "display": "none"
    });

    $(".desban").css({
        "display": "none"
    });

    $(".add_user").css({
        "display": "none",
    });
}

function show_Modal(boton) {
    $(boton).css({
        "display": "block",
    });

    $(".modal-bg").css({
        "visibility": "visible",
        "background-color": "black",
        "opacity": "0.7",
        "transition": "background-color 245ms linear",
        "transition": "transform 245ms ease"
    });

    $(".modal-content").css({
        "visibility": "visible",
        "transform": "scale(1.0)",
        "transition": "transform 245ms ease",
        "z-index": "1000"
    }); 
}

export { empty_input , show_Modal , quit_Modal }
