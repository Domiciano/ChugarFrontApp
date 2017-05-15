using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOPacientePrioritario
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string Nombres { get; set; }
        [DataMember]
        public string Apellidos { get; set; }
        [DataMember]
        public string Cedula { get; set; }
        [DataMember]
        public string NumContacto { get; set; }
        [DataMember]
        public string IdArchivo { get; set; }

        [DataMember]
        public List<DTOVariablePrioritaria> ListaVariablesPrioritarias { get; set; }

        [DataMember]
        public List<DTOVariableDesactualizada> ListaVariablesDesactualizadas { get; set; }

    }
}
