$(document).ready(init);


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        getUsuarioByEmail(user);
    } else {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
    }
});

function init() {
    //Mirar si la sesión esta iniciada y si el usuario existe       
        $("#iniciar").click(iniciar_sesion);

        if (localStorage.getItem("contra") !== null) {
            localStorage.removeItem("contra");
            mostrarMensaje("Se le ha enviado a su correo las instrucciones para crear una nueva contraseña", 3000);
        
    }
    
    
    
}


function iniciar_sesion(evt) {
    evt.preventDefault();
    var email = $("#usuario").val();
    var password = $("#password").val();

    if (email == '' || password == '') {
        mostrarMensaje("Por favor llene todos los campos", 2000);

    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //alert("Datos inváidos");
            mostrarMensaje("El correo o la contraseña son inválidos", 2000);
        });
    }
    //}
}



function mostrarMensaje(mensaje, tiempo) {
    $("#snackbar").css("visibility", "visible");
    $("#snackbar").text(mensaje);    
    $("#snackbar").animate({
        opacity: "1",
        bottom: "60px"
    }, 300);

    
    setTimeout(function () {
        $("#snackbar").animate({
            opacity: "0",
            bottom: "5px"
        }, 300);
    }, tiempo);
}

function validarFormulario() {

    var email = $("#usuario").val();
    var password = $("#password").val();
    var resultado = true;

    if (email == '') {
        $('#usuario').addClass('error');
        $('#usuario').nextAll().remove();
        $('#usuario').after('<label>El usuario no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#usuario').removeClass('error');
        $('#usuario').nextAll().remove();
    }

    if (password == '') {
        $('#password').addClass('error');
        $('#password').nextAll().remove();
        $('#password').after('<label>La contraseña no puede estar vacía.</label>');
        resultado = false;
    } else {
        $('#password').removeClass('error');
        $('#password').nextAll().remove();
    }
    return resultado;
}

function goToCargaDeArchivos() {    
    $(location).attr("href", "/Admin");   
}

function getUsuarioByEmail(user) {
    $.ajax({
        url: "/Data/getUsuarioPorCorreo",
        type: "POST",
        data: { "correo": user.email },
    }).done(function (usuario_str) {
        localStorage.setItem("usuario", usuario_str);
        var usuario = JSON.parse(usuario_str);
        goToCargaDeArchivos();
    }).fail(function (usuario_str) {
        firebase.auth().signOut();
        mostrarMensaje("Ocurrió un error, inténtelo más tarde");
    });
}

function crear_usuario(evt) {
    evt.preventDefault();

    var email = $("#usuario").val();
    var password = $("#password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorCode);
        alert(errorMessage);
        // ...
    });
}


function recuperar_contrasena(emailAddress) {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
    }, function (error) {
        console.log(error);
    });
}