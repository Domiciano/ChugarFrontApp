using CAC.Client.Models;
using CAC.Library.Model.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace WebApplication1.Controllers
{
    public class DataController : Controller
    {
        //URLS DE USUARIOS
        string url = "http://192.168.160.98:10091/api/cac/v1/fake/";
        
        string urlUser = "http://192.168.160.98:10090/api/cac/v1/user/";
        
        // GET: Data
        public ActionResult Index()
        {
            return Content("Chugar");
        }
        
        //ADD -- LISTO
        [HttpPost]
        public ActionResult getUsuarioPorCorreo()
        {
            string correo = Request["correo"];
            var response = "";
            try
            {
                //HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/getbyemail/" + correo);
                HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(urlUser + "getbyemail/" + correo);
                myRequest.Method = "GET";
                myRequest.ContentType = "application/json";
         
                var webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }
        
        //LIST -- LISTO
        [HttpGet]
        public ActionResult getUsuariosList()
        {
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create(urlUser + "list");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }

        //ADD  -- LISTO
        [HttpPost]
        public ActionResult crearUsuario()
        {
            string json = Request["datos"];
            var response = "";
            try
            {
                HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(urlUser + "add");

                myRequest.Method = "POST";
                myRequest.ContentType = "application/json";

                /*JsonSerializer serializer = new JsonSerializer();

                StringReader sr = new StringReader(json);
                Newtonsoft.Json.JsonTextReader reader = new JsonTextReader(sr);

                JsonRequest jsonRequest = (JsonRequest)serializer.Deserialize(reader, typeof(JsonRequest));

                //do work with object*/

                using (var streamWriter = new StreamWriter(myRequest.GetRequestStream()))
                {
                    streamWriter.Write(json);
                    streamWriter.Flush();
                }

                var webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }

        //LISTROLE --LISTO  
        [HttpGet]
        public ActionResult getRolesList()
        {

            var response = "";
            try
            {
                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create(urlUser + "listrole");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }

        //LISTORGANIZATION -- LISTO
        [HttpGet]
        public ActionResult getEmpresasList()
        {
            var response = "";
            try
            {
                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create(urlUser + "listorganization");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }

        /*
        //ESTE METODO PIDE LA LISTA DE USUARIOS TAMBIEN, PERO NO LO ELIMINO HASTA SABER SI AGUIRRE LO UTILIZA
        [HttpGet]
        public ActionResult getList()
        {
            
            var response = "";
            try
            {
                string url = "http://192.168.160.98:10091/api/cac/v1/user/list";
                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create(url);

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e) {
                throw e;
            }

            return Content(response);
        }
        */
        
        //VALIDATOR1 -- LISTO
        [HttpPost]
        [ActionName("UploadFile")]
        public ActionResult UploadFileValidator(HttpPostedFileBase file = null)
        {
            string id_usuario = Request["user_id"];
            if (file != null)
            {
                DTOTransporteArchivo dtotransporte = new DTOTransporteArchivo();

                DTOArchivo archivo = new DTOArchivo();
                archivo.FechaCreacion = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                archivo.Id = Guid.NewGuid().ToString();
                archivo.Tamano = file.ContentLength.ToString();
                archivo.Nombre = file.FileName;
                archivo.IdUsuario = id_usuario;

                try
                {
                    // convert xmlstring to byte using ascii encoding
                    byte[] binario;
                    byte[] buffer = new byte[16 * 1024];
                    using (MemoryStream ms = new MemoryStream())
                    {
                        int read;
                        while ((read = file.InputStream.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            ms.Write(buffer, 0, read);
                        }
                        binario = ms.ToArray();
                    }
                    byte[] data = binario;
                    dtotransporte.Binario = data;
                    dtotransporte.Archivo = archivo;
                    ISynchronizationManager syn = new SynchronizationManager();
                    Request request = new Request();
                    JavaScriptSerializer json_serializer = new JavaScriptSerializer();
                    request.Content = json_serializer.Serialize(dtotransporte);
                    request.ContentType = "application/json";
                    request.Method = "POST";
                    request.Url = "http://192.168.160.98:10090/api/cac/v1/file/validator";

                    Response response = syn.PostRequest(request);                    
                    return Json(response.TextResponse);
                }
                catch (Exception ex)
                {

                }
            }
            return null;
        }

        //VALIDATOR2 -- NO SE USA
        [HttpPost]
        [ActionName("Validator2")]
        public JsonResult UploadFile(HttpPostedFileBase file = null)
        {
            var f = file;
            var response = "";
            try
            {

                // convert xmlstring to byte using ascii encoding
                byte[] binario;
                byte[] buffer = new byte[16 * 1024];
                using (MemoryStream ms = new MemoryStream())
                {
                    int read;
                    while ((read = file.InputStream.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        ms.Write(buffer, 0, read);
                    }
                    binario = ms.ToArray();
                }
                var data = binario;
                // declare httpwebrequet wrt url defined above
                HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/validator2");
                //HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10090/api/cac/v1/file/validator2");
                // set method as post
                webrequest.Method = "POST";
                // set content type
                webrequest.ContentType = "application/x-www-form-urlenconded";
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
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                return Json( ex.ToString() );
            }
            return Json(response);
        }


        //LISTBYUSER -- LISTO
        [HttpGet]
        public ActionResult getArchivosLista()
        {
            var userId = Request["user_id"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10090/api/cac/v1/file/listfilebyuser/" + userId);

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }



        //LISTBYUSER -- 
        [HttpGet]
        public ActionResult getListaDePrioritarios()
        {
            var fileId = Request["file_id"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10090/api/cac/v1/prioritypatient/listbyfile/" + fileId);

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return Content(response);
        }


        //R1
        [HttpGet]
        public ActionResult controlHipertensionArterial()
        {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio+","+fecha_fin;
            return Content(response);
        }

        //R2
        [HttpGet]
        public ActionResult medicionHBA1C() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R3
        [HttpGet]
        public ActionResult conrolDeDiabetesMelitus() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //------------------------------------------->


        //R4
        [HttpGet]
        public ActionResult medicionLDL()
        {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R5
        [HttpGet]
        public ActionResult controlLDL() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //------------------------------------------->

        //R6
        [HttpGet]
        public ActionResult medicionDeAlbuminuria() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R7
        [HttpGet]
        public ActionResult progresionTFG() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R8
        [HttpGet]
        public ActionResult tiempoDeCreatinina() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //------------------------------------------->
        //R9
        [HttpGet]
        public ActionResult PTH1progeso() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R10
        [HttpGet]
        public ActionResult PTH1resultado() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //------------------------------------------->

        //R11
        [HttpGet]
        public ActionResult PTH2progeso() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R12
        [HttpGet]
        public ActionResult PTH2resultado() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //------------------------------------------->

        //R13
        [HttpGet]
        public ActionResult PTH3progeso() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

        //R14
        [HttpGet]
        public ActionResult PTH3resultado() {
            //DIA-MES-ANIO
            var fecha_inicio = Request["fecha_inicio"];
            var fecha_fin = Request["fecha_fin"];
            var response = "";
            try
            {

                HttpWebRequest myRequest =
                    (HttpWebRequest)WebRequest.Create("http://192.168.160.98:10091/api/cac/v1/fake/patientpriority/" + "1");

                myRequest.Method = "GET";
                myRequest.ContentType = "application/x-www-form-urlencoded";

                HttpWebResponse webresponse = (HttpWebResponse)myRequest.GetResponse();
                using (var streamReader = new StreamReader(webresponse.GetResponseStream()))
                {
                    response = streamReader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            response = fecha_inicio + "," + fecha_fin;
            return Content(response);
        }

    }
}