using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAC.Client.Models
{
    /// <summary>
    /// Esta interfaz define los metodos para hacer get, post (json), y send file usando las clases Response y Request
    /// </summary>
    interface ISynchronizationManager
    {
        /// <summary>
        /// Envia un archivo de una ubicación relativa en la carpeta del servidor
        /// </summary>
        /// <param name="path">ubicación relativa del archivo a enviar</param>
        /// <param name="request">Objeto Request configurado para enviar el archivo seleccionado</param>
        /// <returns>Retorna un objeto Response que representa la respuesta del servidor remoto</returns>
        Response SendFile(string path, Request request);
        /// <summary>
        /// Envia objetos mediante el metodo POST haciendo uso Request.Content que es de tipo string.
        /// </summary>
        /// <param name="content">Objeto Request configurado</param>
        /// <returns>Retorna un objeto Response que representa la respuesta del servidor remoto</returns>
        Response PostRequest(Request content);
        /// <summary>
        /// Realiza peticiones GET 
        /// </summary>
        /// <param name="content">Objeto Request configurado</param>
        /// <returns>Retorna un objeto Response que representa la respuesta del servidor remoto</returns>
        Response GetRequest(Request content);
    }
}
