using System.Runtime.Serialization;

namespace CAC.Library.Model.DTO
{
    [DataContract]
    public class DTOCAC
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string IdArchivo { get; set; }

    }
}
