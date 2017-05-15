$("#file").change(setFileName);
$('#mensaje-error').hide();
$("#drag-n-drop").on("dragover", sobreElDiv);
$("#drag-n-drop").on("dragleave", salirDelDiv);
$("#drag-n-drop").on("drop", soltarEnDiv);



//Metodo de carga-de-archivos.html
function enviarArchivo(event) {
    event.preventDefault();
    if ($("#file").get(0).files.length == 0) {
        $('#mensaje-error').fadeIn(500);
        mostrarMensaje("Debes cargar un archivo para continuar. Arrastre el archivo Excel a la página",2000);
    } else {
        doUploadRequest($("#file").get(0).files[0]);
    }
}



//Metodo de carga-de-archivos.html
function setFileName() {
    var filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '');
    if (filename != '') {
        $('#file-name').text(filename);
    }
}

//Metodo de carga-de-archivos.html
function doUploadRequest(archivo) {
    $('#mensaje-error').fadeOut(500);

    var formData = new FormData();
    formData.append('file', archivo);
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    var user_id = usuario.Id;

    formData.append('user_id', user_id);

    $.ajax({
        url: "/Data/UploadFile",
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: formData
    }).done(function (data) {
        //PRUEBA
        //data = "{\"Archivo\":{\"FechaCreacion\":\"2017-04-06 15:08:36\",\"Id\":\"744bc7cb-5cac-485a-b643-ed8c4ce1cd96\",\"IdUsuario\":\"f9587aba-0990-11e7-93ae-92361f002671\",\"NumFilasImportadas\":534,\"Tamano\":\"9184\",\"UrlArchivo\":\"\"},\"List\":null}";
        //data = "{\"Archivo\":null,\"List\":[{\"Celda\":\"B 4\",\"Descripcion\":\"La celda B4 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"B 6\",\"Descripcion\":\"La celda B6 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"B 7\",\"Descripcion\":\"La celda B7 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"D 3\",\"Descripcion\":\"La celda D3 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"D 5\",\"Descripcion\":\"La celda D5 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"D 6\",\"Descripcion\":\"La celda D6 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"D 7\",\"Descripcion\":\"La celda D7 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"E 2\",\"Descripcion\":\"La celda E2 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"E 3\",\"Descripcion\":\"La celda E3 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"E 4\",\"Descripcion\":\"La celda E4 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"E 5\",\"Descripcion\":\"La celda E5 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"E 6\",\"Descripcion\":\"La celda E6 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"E 7\",\"Descripcion\":\"La celda E7 está vacía.\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"\"},{\"Celda\":\"F 2\",\"Descripcion\":\"El tipo de dato de la celda F2 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 999716367\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"999716367\"},{\"Celda\":\"F 3\",\"Descripcion\":\"El tipo de dato de la celda F3 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 856405250\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"856405250\"},{\"Celda\":\"F 4\",\"Descripcion\":\"El tipo de dato de la celda F4 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 282078898\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"282078898\"},{\"Celda\":\"F 5\",\"Descripcion\":\"El tipo de dato de la celda F5 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 162241944\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"162241944\"},{\"Celda\":\"F 6\",\"Descripcion\":\"El tipo de dato de la celda F6 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 268865620\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"268865620\"},{\"Celda\":\"F 7\",\"Descripcion\":\"El tipo de dato de la celda F7 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 542228662\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"542228662\"},{\"Celda\":\"G 2\",\"Descripcion\":\"El tipo de dato de la celda G2 no concuerda con el de la plantilla. Debe ser del tipo 'DateTime' y es de tipo 'Number'. - 35314\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"35314\"},{\"Celda\":\"G 3\",\"Descripcion\":\"El tipo de dato de la celda G3 no concuerda con el de la plantilla. Debe ser del tipo 'DateTime' y es de tipo 'Number'. - 34983\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"34983\"},{\"Celda\":\"G 4\",\"Descripcion\":\"El tipo de dato de la celda G4 no concuerda con el de la plantilla. Debe ser del tipo 'DateTime' y es de tipo 'Number'. - 39940\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"39940\"},{\"Celda\":\"G 5\",\"Descripcion\":\"El tipo de dato de la celda G5 no concuerda con el de la plantilla. Debe ser del tipo 'DateTime' y es de tipo 'Number'. - 37048\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"37048\"},{\"Celda\":\"G 6\",\"Descripcion\":\"El tipo de dato de la celda G6 no concuerda con el de la plantilla. Debe ser del tipo 'DateTime' y es de tipo 'Number'. - 22415\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"22415\"},{\"Celda\":\"G 7\",\"Descripcion\":\"El tipo de dato de la celda G7 no concuerda con el de la plantilla. Debe ser del tipo 'DateTime' y es de tipo 'Number'. - 24062\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"24062\"},{\"Celda\":\"Y 2\",\"Descripcion\":\"El tipo de dato de la celda Y2 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 1\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"1\"},{\"Celda\":\"Y 3\",\"Descripcion\":\"El tipo de dato de la celda Y3 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 2\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"2\"},{\"Celda\":\"Y 4\",\"Descripcion\":\"El tipo de dato de la celda Y4 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 0\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"0\"},{\"Celda\":\"Y 7\",\"Descripcion\":\"El tipo de dato de la celda Y7 no concuerda con el de la plantilla. Debe ser del tipo 'Text' y es de tipo 'Number'. - 4\",\"FechaCreacion\":\"2017-04-05 15:36:46\",\"Valor\":\"4\"}]}";

        localStorage.setItem("lista_errores", data);
        

        var obj = JSON.parse(data);
        
        console.log(obj);

        if (obj.List !== null) {
            gotoAsignarDatosArchivo();
        }
        else if (obj.Archivo !== null) {
            gotoCargaSatisfactoria();
        } else {
            console.log("Error DTO");
        }

    }).fail(function (error) {
        console.log("error");
        console.log(error);
    });

}

function gotoCargaSatisfactoria() {
    //$(location).attr("href", "/Admin/CargaSatisfactoria");
    $(".content").html(waitloadingGif);
    $.ajax({
        type: "GET",
        url: "/Admin/CargaSatisfactoria"
    }).done(function (html) {
        $(".content").html(html);
    });
}

//Metodo de carga-de-archivos.html
function gotoAsignarDatosArchivo() {
    //$(location).attr("href", "/Admin/AsignarDatosArchivo");
    $(".content").html(waitloadingGif);
    $.ajax({
        type: "GET",
        url: "/Admin/AsignarDatosArchivo"
    }).done(function (html) {
        $(".content").html(html);
    });
}


//Metodo de carga-de-archivos.html
function sobreElDiv(event) {
    event.preventDefault();
    $("html body .layout .content .gray-content").css('background-color', '#d2d2d2');
    $("html body .layout .content .gray-content").css("border", "3px dashed black");
    $("#label-excel").text("Suelte el archivo");
}

//Metodo de carga-de-archivos.html
function salirDelDiv(event) {
    event.preventDefault();
    $("html body .layout .content .gray-content").css('background-color', '#f4f4f5');
    $("html body .layout .content .gray-content").css("border", "0px solid red");
    $("#label-excel").text("Arrastre su archivo a esta zona");
}

//Metodo de carga-de-archivos.html
function soltarEnDiv(event) {
    event.preventDefault();
    var files = event.originalEvent.dataTransfer.files;

    $("html body .layout .content .gray-content").css('background-color', '#f4f4f5');
    $("html body .layout .content .gray-content").css("border", "0px solid red");
    $("#label-excel").text("Cargando...");
    $('#file-name').text(files[0].name);

    doUploadRequest(files[0]);

}

