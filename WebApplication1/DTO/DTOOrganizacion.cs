using System;
using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOOrganizacion
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string NIT { get; set; }
        [DataMember]
        public string Nombre { get; set; }
        [DataMember]
        public string Direccion { get; set; }
        [DataMember]
        public string NumeroTelefonico { get; set; }
        [DataMember]
        public bool EPS { get; set; }

    }
}
