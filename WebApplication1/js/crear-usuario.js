$("#cancelar").click(function (e) {
    e.preventDefault();
    $(".content").html(waitloadingGif);
    $.ajax({
        type: "GET",
        url: "/Admin/GestionUsuarios"
    }).done(function (html) {
        $(".content").html(html);
    });
});
//var url = 'http://192.168.160.98:10091/api/cac/v1/user/';

//var org = "[{\"Direccion\":\"Pance\",\"EPS\":true,\"Id\":\"608c295c-efb0-11e6-bc64-92361f002671\",\"NIT\":\"984530\",\"Nombre\":\"Universidad Icesi1\",\"NumeroTelefonico\":null},{\"Direccion\":\"Pance\",\"EPS\":true,\"Id\":\"608c295c-efb0-11e6-bc64-92361f002671\",\"NIT\":\"984530\",\"Nombre\":\"Universidad Icesi\",\"NumeroTelefonico\":null}]";
//var rl = "[{\"Descripcion\":\"Para pruebas\",\"Id\":\"608c2786-efb0-11e6-bc64-92361f002671\",\"Nombre\":\"EPS_TESTER1\"},{\"Descripcion\":\"Para pruebas\",\"Id\":\"608c2786-efb0-11e6-bc64-92361f002671\",\"Nombre\":\"EPS_TESTER\"}]"

// Cargar la lista de roles activos
$(function () {
    /*var roles = JSON.parse(rl);
    console.log(roles);

    $('#rol').empty();

    for (var key in roles) {
        $('#rol').append('<option value="' + roles[key].Id + '">'+roles[key].Nombre+'</option>');
        console.log(roles[key].Nombre);
    }*/

    $.ajax({
        url: "/Data/getRolesList",
        type: "GET",
    }).done(function (respuesta) {
        //--------------------------------
        console.log(respuesta);

        var roles = JSON.parse(respuesta);
        console.log(roles);

        $('#rol').empty();

        for (var key in roles) {
            $('#rol').append('<option value="' + roles[key].Id + '">' + roles[key].Nombre + '</option>');
            console.log(roles[key].Nombre);
        }
    }).fail(function (response) {
        console.log("error");
        console.log(response);
        //alert(response);
    });

});

// Cargar la lista de empresas activos
$(function () {
    /*var empr = JSON.parse(org);
    console.log(empr);

    $('#company').empty();

    for (var key in empr) {
        $('#company').append('<option value="' + empr[key].Id + '">' + empr[key].Nombre + '</option>');
        console.log(empr[key].Nombre);
    }*/

    $.ajax({
        url: "/Data/getEmpresasList",
        type: "GET",
    }).done(function (respuesta) {
        //--------------------------------
        console.log(respuesta);

        var empr = JSON.parse(respuesta);
        console.log(empr);

        $('#company').empty();

        for (var key in empr) {
            $('#company').append('<option value="' + empr[key].Id + '">' + empr[key].Nombre + '</option>');
            console.log(empr[key].Nombre);
        }
    }).fail(function (response) {
        console.log("error");
        console.log(response);
        //alert(response);
    });

});

// Function para enviar el formulario.
function enviarFormularioCreacion() {
    if (validarFormulario()) {

        // armar JSON
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var celular = $('#celular').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var rol = $('#rol').val();
        var company = $('#company').val();
        var aprobado = $('#aprobado').prop('checked');

        var token;

        /*var myFirebaseRef = new Firebase("https://diabetesicesi-123d7.firebaseio.com");

		myFirebaseRef.createUser({
		    email: email,
		    password: password
		}, function (error, userData) {
		    if (error) {
		        console.log("Error creating user:", error);
		    } else {
		        token = userData.uid;
		        console.log("Successfully created user account with uid:", userData.uid);
		    }
		});*/

        //registratFirebase(email, password);
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            console.log('everything went fine' + user);
            console.log('user object:' + user.uid);
            token = user.uid;
            var obj = {};
            obj["Id"] = generateUUID();
            obj["Nombres"] = nombre;
            obj["Apellidos"] = apellido;
            obj["Email"] = email;
            obj["NumCelular"] = celular;
            //obj["password"] = password;
            obj["UIDFirebase"] = token;
            obj.Rol = { 'Id': rol };
            obj.Organizacion = { 'Id': company };
            //obj["aprobado"] = aprobado;

            var json = JSON.stringify(obj);

            //alert(json);

            $.ajax({
                url: "/Data/crearUsuario",
                type: 'POST',
                data: { datos: json.toString() }
            })
            .done(function (response) {
                console.log("success");
                if (response === 'true') { 
                    alert('Usuario creado correctamente');
                    $.ajax({
                        type: "GET",
                        url: "/Admin/GestionUsuarios"
                    }).done(function (html) {
                        $(".content").html(html);
                    });
                } else {
                    alert('No se pudo crear el usuario');
                }
            })
            .fail(function (response) {
                console.log("error server");
                alert('No se pudo crear el usuario');
                //alert(response);
            })
            .always(function () {
                console.log("complete");
            });

            //you can save the user data here.
        }).catch(function (error) {
            console.log('there was an error - FIREBASE');
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ' - ' + errorMessage);
        });


    }
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

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
        if (isValidEmailAddress(email)) {
            $('#email').removeClass('error');
            $('#email').nextAll().remove();
        } else {
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
        if (password.length > 5) {
            $('#password').removeClass('error');
            $('#password').nextAll().remove();
        } else {
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
        if (confPassword.length > 5) {
            $('#conf-password').removeClass('error');
            $('#conf-password').nextAll().remove();
        } else {
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

/*$(function() {
	// Function para cargar el combobox. Obtener de api la lista y llebar el combo
	for (var i = 0; i < 10; i++) {
		$('#rol').append('<option value="' + (i + 10) + '">Admin</option>');
	}
});
*/
