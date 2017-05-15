$("#crearusuario").click(function (e) {
    e.preventDefault();
    $(".content").html(waitloadingGif);
    $.ajax({
        type: "GET",
        url: "/Admin/CrearUsuario"
    }).done(function (html) {
        $(".content").html(html);
    });
});
    // Cargar la lista de usuarios activos
    $(function () {
        $.ajax({
            url: "/Data/getUsuariosList",
            type: "GET",
        }).done(function (respuesta) {
            //--------------------------------
            console.log(respuesta);

            //var json = JSON.parse(pacientes);
            //var respuesta = "[{\"Apellidos\":\"Arango\",\"Email\":\"homero379@gmail.com\",\"Id\":\"f9587aba-0990-11e7-93ae-92361f002671\",\"Nombres\":\"Juan\",\"NumCelular\":\"369887946\",\"Organizacion\":{\"Direccion\":\"Pance\",\"EPS\":true,\"Id\":\"608c295c-efb0-11e6-bc64-92361f002671\",\"NIT\":\"984530\",\"Nombre\":\"Universidad Icesi\",\"NumeroTelefonico\":null},\"Rol\":{\"Descripcion\":\"Para pruebas\",\"Id\":\"608c2786-efb0-11e6-bc64-92361f002671\",\"Nombre\":\"EPS_TESTER\"}}]";
            var pacientes = JSON.parse(respuesta);
            console.log(pacientes);

            if (jQuery.isEmptyObject(pacientes)) {
                $('#alerta').empty().append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>No hay usuarios registrados.</div>');
            } else {
                $('#tabla-usuarios').empty();
                for (var key in pacientes) {

                    var nombre = pacientes[key].Nombres != undefined ? pacientes[key].Nombres : '';
                    var apellido = pacientes[key].Apellidos != undefined ? pacientes[key].Apellidos : '';

                    var botones = '';

                    botones = '<td><div class="acciones"><a target="_blank" href="/Editar_Paciente/' + pacientes[key].Id + '" class="taccion" data-toggle="tooltip" data-placement="top" title="Editar usuario"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></a></div></td>';

                    // Faltan el aprobad la cedula y el estado y la ùltma actividad
                    //$('#tabla-usuarios').append('<tr><td>' + nombre + ' ' + apellido + '</td><td>' + '<span class="glyphicon glyphicon-ok">' + '</td><td>' + '</td><td>' + '<span class="glyphicon glyphicon-remove">' + '</td><td>' + pacientes[key].Email + '</td></tr>');//+'</td>' + botones + '</td></tr>');
                    $('#tabla-usuarios').append('<tr><td class="centered">' + nombre + ' ' + apellido + '</td><td class="centered">' + pacientes[key].Email + '</td><td class="centered">' + pacientes[key].NumCelular + '</td><td class="centered">' + pacientes[key].Organizacion.Nombre + '</td></tr>');//+'</td>' + botones + '</td></tr>');
                }

                //$('#div-resultados').removeClass('hidden');

                var $container = $('.table-container');
                var $table = $('.table');

                //$container.perfectScrollbar();



                $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
                //-------------------------------

            }

        }).fail(function (response) {
            console.log("error");
            console.log(response);
            //alert(response);
        });

    });