using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOVariablePrioritaria
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string NombreVariable { get; set; }
        [DataMember]
        public string ValorVariable { get; set; }
        [DataMember]
        public string ValorUmbral { get; set; }
    }
}
