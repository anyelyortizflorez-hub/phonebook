using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneBookApi.Data;
using PhoneBookApi.Dtos;
using PhoneBookApi.Models;

namespace PhoneBookApi.Controllers
{
    // empece validando el modelo
    // los Required de los DTOs y asi devuelva error 400 si algo falta.
    [ApiController]
    [Route("api/[controller]")] // con esto arme la ruta: api/contacts
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // inyecte DbContext aqui Dependency Injection.
        public ContactsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/contacts?types=0,1
        // types es opcional y asi se filtra por tipo de contacto.

        public async Task<ActionResult<IEnumerable<ContactDto>>> GetContacts([FromQuery] string? types)
        {
            IQueryable<Contact> query = _context.Contacts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(types))
            {
                // Convertimos "0,1" en una lista de enteros: [0, 1]
                var typeList = types
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(t => int.Parse(t.Trim()))
                    .ToList();

                query = query.Where(c => typeList.Contains((int)c.ContactType));
            }

            var contacts = await query
                .OrderBy(c => c.Name)
                .Select(c => ToDto(c))
                .ToListAsync();

            return Ok(contacts);
        }

        // GET api/contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(ToDto(contact));
        }

        // Cree un contacto nuevo 
        [HttpPost]
        public async Task<ActionResult<ContactDto>> CreateContact(SaveContactDto dto)
        {
            // ApiController + Required en el dto, si faltan datos
            // obligatorios, ASP.NET Core ya responde 400 automaticamente antes de llegar aqui por fin.

            var contact = new Contact
            {
                ContactType = (ContactType)dto.ContactType,
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
                Comments = dto.Comments,
                BirthDate = dto.BirthDate,
                JobTitle = dto.JobTitle,
                RegistrationNumber = dto.RegistrationNumber,
                Department = dto.Department,
                TaxId = dto.TaxId,
                Industry = dto.Industry
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, ToDto(contact));
        }

        // put api/contacts/5
        // con esto se actualiza un contacto existente y asi usarlo cuando el modal esta en modo EDIT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, SaveContactDto dto)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            contact.ContactType = (ContactType)dto.ContactType;
            contact.Name = dto.Name;
            contact.PhoneNumber = dto.PhoneNumber;
            contact.Comments = dto.Comments;
            contact.BirthDate = dto.BirthDate;
            contact.JobTitle = dto.JobTitle;
            contact.RegistrationNumber = dto.RegistrationNumber;
            contact.Department = dto.Department;
            contact.TaxId = dto.TaxId;
            contact.Industry = dto.Industry;

            await _context.SaveChangesAsync();

            return NoContent(); // 204: todo salió bien, no hay nada que devolver
        }

        // DELETE api/contacts/5
        // cuando el usuario confirma "si" en el modal de confirmacion
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // No repetir el mismo mapeo de Contact como ContactDto en cada endpoint
        private static ContactDto ToDtoContact = new ContactDto
        {
            Id = c.Id,
            ContactType = (int)c.ContactType,
            Name = c.Name,
            PhoneNumber = c.PhoneNumber,
            Comments = c.Comments,
            BirthDate = c.BirthDate,
            JobTitle = c.JobTitle,
            RegistrationNumber = c.RegistrationNumber,
            Department = c.Department,
            TaxId = c.TaxId,
            Industry = c.Industry
        };
    }
}
