using Microsoft.EntityFrameworkCore;
using PhoneBookApi.Models;

namespace PhoneBookApi.Data
{
    // Use DbContext porque es la clave principal de Entity.
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Le dice a EF Core quiero una tabla llamada Contacts,
        // basada en la clase Contact".
        public DbSet<Contact> Contacts { get; set; } = null!;
    }
}
