$(".menu_btn").click(function(){
    document.querySelector(".sidemenu").classList.toggle("menu_expanded");
    document.querySelector(".sidemenu").classList.toggle("menu_collapsed");
    document.querySelector('body').classList.toggle("body_expanded")
    document.querySelector('body').classList.toggle("body_phone")
    localStorage.setItem('menu_status', document.querySelector(".sidemenu").classList);
    localStorage.setItem('menu', document.querySelector('body').classList);
})

function empty_input() {
    $('#nif').val('');
    $('#name').val('');
    $('#surname').val('');
    $('#gmail').val('');
    $('#password').val('');
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

    $(".account").css({
        "display": "none",
    });

    $(".insert_account").css({
        "display": "none",
    });

    $(".operation_ingresar").css({
        "display": "none",
    });

    $(".operation_retirar").css({
        "display": "none",
    });

    $(".operation_transferir").css({
        "display": "none",
    });
}

function open_ResponsiveModal() {
    if (screen.width < 520) {
        $(".modal-content").css({
            "top": "10%"
        });

        $(".modal_content").css({
            "max-height": "60vh"
        });
    
    } else if (screen.width >= 1300) {
        $(".modal-content").css({
            "top": "40%"
        });
        
        $(".modal_content").css({
            "max-height": "50vh"
        });
    } else {
        $(".modal-content").css({
            "top": "30%"
        });

        $(".modal_content").css({
            "max-height": "50vh"
        });
    }
}

function close_ResponsiveModal () {
    if (screen.width < 520) {
        $(".modal-content").css({
            "top": "30%"
        });

        $(".modal_content").css({
            "max-height": "60vh"
        });
    } else if (screen.width >= 1300) {
        $(".modal-content").css({
            "top": "60%"
        });
        
        $(".modal_content").css({
            "max-height": "50vh"
        });
    } else {
        $(".modal-content").css({
            "top": "30%"
        });

        $(".modal_content").css({
            "max-height": "10vh"
        });
    }
}



export { empty_input , show_Modal , quit_Modal , open_ResponsiveModal , close_ResponsiveModal }
