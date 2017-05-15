using System;
using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOUsuario
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string Nombres { get; set; }
        [DataMember]
        public string Apellidos { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string NumCelular { get; set; }
        [DataMember]
        public string UIDFirebase { get; set; }
        [DataMember]
        public DTORol Rol { get; set; }
        [DataMember]
        public DTOOrganizacion Organizacion { get; set; }

    }
}
