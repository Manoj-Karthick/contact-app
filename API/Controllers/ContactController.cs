using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly DataContext _context;

        public ContactController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();
            return contacts;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (contact != null)
            {
                return contact;
            }
            return NotFound();
        }

        
        [Route("add-contact")]
        [HttpPost("contact")]
        public async Task<ActionResult> AddContact(Contact contact)
        {
            try
            {
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        
        [Route("update-contact")]
        [HttpPost("{id}")]
        public async Task<ActionResult> EditContact([FromQuery] string id,[FromBody] Contact newContact)
        {
            var oldContact = await _context.Contacts.Where(x => x.Id == int.Parse(id)).FirstOrDefaultAsync();
            if (oldContact != null)
            {
                oldContact.FirstName = newContact.FirstName;
                oldContact.LastName = newContact.LastName;
                oldContact.Address = newContact.Address;
                oldContact.City = newContact.City;
                oldContact.Country = newContact.Country;
                oldContact.Email = newContact.Email;
                oldContact.PhoneNumber = newContact.PhoneNumber;
                oldContact.PostalCode = newContact.PostalCode;
                oldContact.State = newContact.State;

                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
           
        }
    }
}
