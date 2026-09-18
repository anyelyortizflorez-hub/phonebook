using System.ComponentModel.DataAnnotations;

namespace PhoneBookApi.Dtos
{
    // Implemente DTO porque es el que llega desde el formulario del modal Add y Edit.
    // Aqui puselas validacion del lado del servidor "validación backend".
    public class SaveContactDto
    {
        [Required(ErrorMessage = "El tipo de contacto es obligatorio")]
        public int ContactType { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "El teléfono es obligatorio")]
        [MaxLength(30)]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Comments { get; set; }

        public DateOnly? BirthDate { get; set; }
        public string? JobTitle { get; set; }

        public string? RegistrationNumber { get; set; }
        public string? Department { get; set; }

        public string? TaxId { get; set; }
        public string? Industry { get; set; }
    }
}
