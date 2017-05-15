function closeSideMenu() {
    $('#side-menu').removeClass('side-menu-open');
    $("#backdrop").removeClass('bd-show');
}

function openSideMenu() {
    event.preventDefault();
    $('#side-menu').addClass('side-menu-open');
    $("#backdrop").addClass('bd-show');
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {        
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $("#nombre_usuario").text(usuario.Nombres + " " + usuario.Apellidos);
        $("#nombre_usuario_menu").text(usuario.Nombres + " " + usuario.Apellidos);
    } else {
        localStorage.removeItem("usuario");
        $(location).attr("href", "/Login");
    }
});

$(document).ready(init);


function init() {

    $("#cerrarsesion").click(cerrar_sesion);
    $("#siguiente-carga-archivos").click(enviarArchivo);
    //drag-n-drop
    $(document).on("dragover", function (event) {
        event.preventDefault();
    });

    $(document).on("dragenter", function (event) {
        event.preventDefault();
    });

    $(document).on("dragleave", function (event) {
        event.preventDefault();
    });

    $(document).on("drop", function (event) {
        event.preventDefault();
    });
    //Comportamiento del side-menu

    $(window).resize(function () {
        if ($(window).width() > 767) {
            closeSideMenu();
        }
    });

    $(".menu-link").click(function () {
        closeSideMenu();
    });
    $("#backdrop").click(function () {
        closeSideMenu();
    });    

    
}

function cerrar_sesion(evt) {    
    evt.preventDefault();
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}



