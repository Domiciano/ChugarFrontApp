using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace CAC.Client.Models
{
    [Serializable]
    public class Response
    {
        public HttpWebResponse Webresponse { get; set; }
        public string TextResponse { get; set; }
    }
}