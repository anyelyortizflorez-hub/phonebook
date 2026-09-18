namespace PhoneBookApi.Dtos
{

    public class ContactDto
    {
        public int Id { get; set; }
        public int ContactType { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Comments { get; set; }

        public DateOnly? BirthDate { get; set; }
        public string? JobTitle { get; set; }

        public string? RegistrationNumber { get; set; }
        public string? Department { get; set; }

        public string? TaxId { get; set; }
        public string? Industry { get; set; }
    }
}
