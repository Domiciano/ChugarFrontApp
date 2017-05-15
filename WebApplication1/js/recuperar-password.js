$(document).ready(init);

function init() {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    $("#recuperar-password").click(enviarCorreo);
}

function enviarCorreo() {
    var auth = firebase.auth();
    var emailAddress = $("#usuario_recuperar").val();
    
    if (emailAddress.toString().trim() !== '') {
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            $(location).attr("href", "/Login");
            localStorage.setItem("contra","");
        }, function (error) {
            mostrarMensaje("Este correo no está inscrito en el portal", 2000);
        });
    } else {
        mostrarMensaje("Escriba su correo", 2000);
    }

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