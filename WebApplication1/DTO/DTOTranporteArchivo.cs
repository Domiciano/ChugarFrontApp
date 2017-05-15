using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOTransporteArchivo
    {
        [DataMember]
        public DTOArchivo Archivo {get;set;}

        [DataMember]
        public byte[] Binario { get; set; }
    }
}
