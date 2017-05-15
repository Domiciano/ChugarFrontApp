using System;
using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOValidacionArchivo
    {
        [DataMember]
        public string Celda { get; set; }
        [DataMember]
        public string Descripcion { get; set; }
        [DataMember]
        public string FechaCreacion { get; set; }
        [DataMember]
        public string Valor { get; set; }

        public override string ToString()
        {
            return $"{Celda}";
        }

    }
}
