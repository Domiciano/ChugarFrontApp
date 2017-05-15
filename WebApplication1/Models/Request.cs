using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CAC.Client.Models
{
    /// <summary>
    /// Clase que representa un request
    /// </summary>
    public class Request
    {
        private string _contentType;
        private string _method;
        private string _content;
        private string _url;

        public string Url
        {
            get { return _url; }
            set { _url = value; }
        }

        public string Content
        {
            get { return _content; }
            set { _content = value; }
        }
        public string Method
        {
            get { return _method; }
            set { _method = value; }
        }
        public string ContentType
        {
            get { return _contentType; }
            set { _contentType = value; }
        }
    }
}