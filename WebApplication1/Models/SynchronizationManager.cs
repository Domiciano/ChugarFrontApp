using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace CAC.Client.Models
{
    /// <summary>
    /// Sobre implementa la interfaz ISynchronizationManager
    /// </summary>
    public class SynchronizationManager : ISynchronizationManager
    {
        /// <summary>
        /// Realiza peticiones GET 
        /// </summary>
        /// <param name="content">Objeto Request configurado</param>
        /// <returns>Retorna un objeto Response que representa la respuesta del servidor remoto</returns>
        public Response GetRequest(Request content)
        {
            try
            {
                HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(content.Url);
                webrequest.Method = content.Method;
                webrequest.ContentType = content.ContentType;
                var webresponse = (HttpWebResponse)webrequest.GetResponse();
                Response getresponse = new Response();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    getresponse.TextResponse = streamReader.ReadToEnd();
                }
                getresponse.Webresponse = webresponse;
                return getresponse;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// Envia objetos mediante el metodo POST haciendo uso Request.Content que es de tipo string.
        /// </summary>
        /// <param name="content">Objeto Request configurado</param>
        /// <returns>Retorna un objeto Response que representa la respuesta del servidor remoto</returns>
        public Response PostRequest(Request content)
        {
            try
            {
                Response getresponse = new Response();
                HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(content.Url);
                webrequest.Method = content.Method;
                webrequest.ContentType = content.ContentType;
                using (var streamWriter = new StreamWriter(webrequest.GetRequestStream()))
                {
                    streamWriter.Write(content.Content);
                    streamWriter.Flush();
                }
                HttpWebResponse webresponse = (HttpWebResponse)webrequest.GetResponse();

                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    getresponse.TextResponse = streamReader.ReadToEnd();
                }
                getresponse.Webresponse = webresponse;
                return getresponse;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// Envia un archivo de una ubicación relativa en la carpeta del servidor enviandolo como un objeto binario
        /// </summary>
        /// <param name="path">ubicación relativa del archivo a enviar</param>
        /// <param name="request">Objeto Request configurado para enviar el archivo seleccionado</param>
        /// <returns>Retorna un objeto Response que representa la respuesta del servidor remoto</returns>
        public Response SendFile(string path, Request request)
        {
            try
            {
                Response getresponse = new Response();
                // convert xmlstring to byte using ascii encoding
                byte[] data = File.ReadAllBytes(path);
                // declare httpwebrequet wrt url defined above
                HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(request.Url);
                // set method as post
                webrequest.Method = request.Method;
                // set content type
                webrequest.ContentType = request.ContentType;
                // set content length
                webrequest.ContentLength = data.Length;
                webrequest.Timeout = 300000;
                // get stream data out of webrequest object
                Stream newStream = webrequest.GetRequestStream();
                newStream.Write(data, 0, data.Length);
                newStream.Close();
                // declare & read response from service
                HttpWebResponse webresponse = (HttpWebResponse)webrequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    getresponse.TextResponse = streamReader.ReadToEnd();
                }
                getresponse.Webresponse = webresponse;
                return getresponse;
            }
            catch (Exception ex)
            {
               throw ex;
            }
        }
    }
}