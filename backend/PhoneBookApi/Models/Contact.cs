using System.ComponentModel.DataAnnotations;

namespace PhoneBookApi.Models
{

    // Mi decision del diseño fue simple en vez de crear 3 tablas distintas
    // una por cada tipo de contacto, use UNA sola tabla con columnas extra
    // que solo se llenan segun el tipo de contacto. Las que no aplican quedan en null.
    // Es la forma mas sencilla de resolver campos distintos por tipo de contacto.
    public class Contact
    {
        public int Id { get; set; }

        [Required]
        public ContactType ContactType { get; set; }

        // Campos comunes a TODOS los tipos de contacto (obligatorios)
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Comments { get; set; }

        // Campo extra para ContactType.Person 
        public DateOnly? BirthDate { get; set; }
        [MaxLength(100)]
        public string? JobTitle { get; set; }

        // Campo extra para ContactType.PublicOrganization 
        [MaxLength(50)]
        public string? RegistrationNumber { get; set; }
        [MaxLength(100)]
        public string? Department { get; set; }

        // Campo extra para ContactType.PrivateOrganization 
        [MaxLength(50)]
        public string? TaxId { get; set; }
        [MaxLength(100)]
        public string? Industry { get; set; }
    }
}
