using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOResponse
    {
        [DataMember]
        public DTOArchivo Archivo { get; set; }
        [DataMember]
        public List<DTOValidacionArchivo> List { get; set; }
    }
}
