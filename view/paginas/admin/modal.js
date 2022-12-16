const btn = $(".menu_btn");
const menu = document.querySelector(".sidemenu");

btn.click(function(){
    menu.classList.toggle("menu_expanded");
    menu.classList.toggle("menu_collapsed");

    document.querySelector('body').classList.toggle("body_expanded")

})

$("#new_user").click(function() {
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

    $(".add_user").css({
        "display": "block",
    });
    
})

$(".delete_button").click(function() {
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

    $(".borrar").css({
        "display": "block",
    });
    
})

$(".update_button").click(function() {
    $(".modal-bg").css({
    "visibility": "visible",
    "background-color": "black",
    "opacity": "0.7",
    "transition": "background-color 245ms linear",
    });

    $(".modal-content").css({
        "visibility": "visible",
        "transform": "scale(1.0)",
        "transition": "transform 245ms ease",
        "z-index": "1000"
    });

    $(".modify").css({
        "display": "block"
    });
})

$(".ban_button").click(function() {
    $(".modal-bg").css({
    "visibility": "visible",
    "background-color": "black",
    "opacity": "0.7",
    "transition": "transform 245ms ease",
    });

    $(".modal-content").css({
        "visibility": "visible",
        "transform": "scale(1.0)",
        "transition": "transform 245ms ease",
        "z-index": "1000"
    });

    $(".banear").css({
        "display": "block"
    });
})

$(".desban_button").click(function() {
    $(".modal-bg").css({
    "visibility": "visible",
    "background-color": "black",
    "opacity": "0.7",
    "transition": "background-color 245ms linear",
    });

    $(".modal-content").css({
        "visibility": "visible",
        "transform": "scale(1.0)",
        "transition": "transform 245ms ease",
        "z-index": "1000"
    });

    $(".desban").css({
        "display": "block"
    });
})

$("#decline").click(function() {
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
})

$("#close").click(function() {
    $(".modal-bg").css({
    "visibility": "hidden",
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

})