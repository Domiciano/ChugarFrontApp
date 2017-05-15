using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOVariableDesactualizada
    {

        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string NombreVariable { get; set; }
        [DataMember]
        public string ValorVariable { get; set; }
        [DataMember]
        public string MesesDesactualizados { get; set; }

    }
}
