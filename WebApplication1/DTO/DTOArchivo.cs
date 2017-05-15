using System;
using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOArchivo
    {
        [DataMember]
        public string Id { get; set; }
        /// <summary>
        /// Obligatorio (nombre+extensión)
        /// </summary>
        [DataMember]
        public string Nombre { get; set; }
        [DataMember]
        public string Tamano { get; set; }
        /// <summary>
        /// yyyy-mm-dd HH:mm:ss
        /// </summary>
        [DataMember]
        public string FechaCreacion { get; set; }
        [DataMember]
        public int NumFilasImportadas { get; set; }
        [DataMember]
        public string UrlArchivo { get; set; }
        /// <summary>
        /// Obligatorio
        /// </summary>
        [DataMember]
        public string IdUsuario { get; set; }

    }
}
