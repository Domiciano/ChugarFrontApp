var url = "http://192.168.160.98:10091/api/cac/v1/user/";

// Function para enviar el formulario.
function enviarFormularioEdicion() {
    if(validarFormulario()){

        // armar JSON
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var celular = $('#celular').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var rol = $('#rol').val();
        var company = $('#company').val();
        var aprobado = $('#aprobado').prop('checked');

        var json = {};// Falta la contraseña
        json["nombre"] = nombre;
        json["apellido"] = apellido;
        json["email"] = email;
        json["celular"] = celular;
        json["password"] = password;
        json["rol"] = rol;
        json["company"] = company;
        json["aprobado"] = aprobado;

        $.ajax({
            url: '/Crear_Usuario',
            type: 'POST',
            data: {usuario: json}
        })
		.done(function() {
		    console.log("success");
		})
		.fail(function() {
		    console.log("error");
		})
		.always(function() {
		    console.log("complete");
		});		
    }
}

// Function para validar el formulario.
function validarFormulario() {
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var celular = $('#celular').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confPassword = $('#conf-password').val();
    var rol = $('#rol').val();
    var company = $('#company').val();
    var aprobado = $('#aprobado').prop('checked');
    var resultado = true;

    if (nombre == '') {
        $('#nombre').addClass('error');
        $('#nombre').nextAll().remove();
        $('#nombre').after('<label>El nombre no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#nombre').removeClass('error');
        $('#nombre').nextAll().remove();
    }

    if (apellido == '') {
        $('#apellido').addClass('error');
        $('#apellido').nextAll().remove();
        $('#apellido').after('<label>El apellido no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#apellido').removeClass('error');
        $('#apellido').nextAll().remove();
    }

    if (celular == '') {
        $('#celular').addClass('error');
        $('#celular').nextAll().remove();
        $('#celular').after('<label>El celular no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#celular').removeClass('error');
        $('#celular').nextAll().remove();
    }

    if (email == '') {
        $('#email').addClass('error');
        $('#email').nextAll().remove();
        $('#email').after('<label>El email no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#email').removeClass('error');
        $('#email').nextAll().remove();
        if(isValidEmailAddress(email)){
            $('#email').removeClass('error');
            $('#email').nextAll().remove();
        }else{
            $('#email').addClass('error');
            $('#email').nextAll().remove();
            $('#email').after('<label>Formato de email inválido.</label>');
            resultado = false;
        }	
    }

    if (password == '') {
        $('#password').addClass('error');
        $('#password').nextAll().remove();
        $('#password').after('<label>El password no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#password').removeClass('error');
        $('#password').nextAll().remove();
        if(password.length >5){
            $('#password').removeClass('error');
            $('#password').nextAll().remove();
        }else{
            $('#password').addClass('error');
            $('#password').nextAll().remove();
            $('#password').after('<label>Debe tener mínimo 6 caracteres.</label>');
            resultado = false;
        }	
    }

    if (confPassword == '') {
        $('#conf-password').addClass('error');
        $('#conf-password').nextAll().remove();
        $('#conf-password').after('<label>El password no puede estar vacío.</label>');
        resultado = false;
    } else {
        $('#conf-password').removeClass('error');
        $('#conf-password').nextAll().remove();
        if(confPassword.length >5){
            $('#conf-password').removeClass('error');
            $('#conf-password').nextAll().remove();
        }else{
            $('#conf-password').addClass('error');
            $('#conf-password').nextAll().remove();
            $('#conf-password').after('<label>Debe tener mínimo 6 caracteres.</label>');
            resultado = false;
        }	
    }

    if (confPassword == password) {
        $('#conf-password').removeClass('error');
        $('#conf-password').nextAll().remove();
        $('#password').removeClass('error');
        $('#password').nextAll().remove();			
    } else {
        $('#conf-password').addClass('error');
        $('#conf-password').nextAll().remove();
        $('#conf-password').after('<label>Las contraseñas deben coincidir</label>');
        $('#password').addClass('error');
        $('#password').nextAll().remove();
        $('#password').after('<label>Las contraseñas deben coincidir</label>');
        resultado = false;		
    }	

    return resultado;
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function registratFirebase(){

}

$(function() {
    // Function para cargar el combobox. Obtener de api la lista y llenar el combo
    var json{
        administrador: "Admin",
        eps: "EPS",
        ips: "IPS",
        carga_archivo: "Carga archivo"
    }
    for (var i = 0; json.length; i++) {
        $('#rol').append('<option value="' + (i + 10) + '">Admin</option>');
    }

    function getResults(str) {
        $.ajax({
            url:'suggest.html',
            type:'POST',
            data: 'q=' + str,
            dataType: 'json',
            success: function( json ) {
                $.each(json, function(i, optionHtml){
                    $('#myselect').append(optionHtml);
                });
            }
        });
    };
});

