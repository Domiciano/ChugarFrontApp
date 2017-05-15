localStorage.removeItem('cedula');
localStorage.removeItem('file-id');

var usuario = JSON.parse(localStorage.getItem("usuario"));
var user_id = usuario.Id;

$("#view-file").click(viewFile);
$("#cargarmasarchivos").click(gotoCargarArchivos);

$.ajax({
    url: "/Data/getArchivosLista",
    type: "GET",
    data: { "user_id": user_id }
}).done(function (respuesta) {
    $("#mensaje").text("A continuación se listan sus archivos de cuenta de alto costo");
    var json = JSON.parse(respuesta);
    console.log(json);
    $("#tabla-archivos").empty();
    if (json.length > 0) {
        for (var i = 0 ; i < json.length ; i++) {
            var html_fila = "<tr><td><center><a href='#' id='" + json[i].Id + "'><img src='images/excel.png' height='32' width='32'/></a></center><p><center><b>" + json[i].Nombre + "</b></center></p></td><td>" + json[i].NumFilasImportadas + "</td><td>" + json[i].FechaCreacion + "</td><td>" + (json[i].Tamano / 1000) + " KB</td><td><a href='" + json[i].UrlArchivo + "'>DESCARGAR<a></td></tr>";
            $("#tabla-archivos").append(html_fila);
            $("#" + json[i].Id).click(viewFile);
        }
    } else {
        $("#tabla-archivos").append("<tr><td>No se encontraron archivos</td><td></td><td></td><td></td><td></td></tr>");
    }
});

function viewFile(e) {
    e.preventDefault();
    var id = $(this).attr('id');
    localStorage.setItem('file-id', id);
    //$(location).attr("href", "lista-prioritarios.html");
    $(".content").html(waitloadingGif);
    $.ajax({
        type: "GET",
        url: "/Admin/ListaPrioritarios"
    }).done(function (html) {
        $(".content").html(html);
    });
}

function gotoCargarArchivos() {
    $(".content").html(waitloadingGif);
    $.ajax({
        type: "GET",
        url: "/Admin/CargarArchivos"
    }).done(function (html) {
        $(".content").html(html);
    });
}