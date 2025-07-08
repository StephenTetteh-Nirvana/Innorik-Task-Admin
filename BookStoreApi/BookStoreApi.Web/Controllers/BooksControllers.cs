using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookStoreApi.Web.Data;
using BookStoreApi.Web.Models;
using Microsoft.Extensions.Logging;

namespace BookStoreApi.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protects all book routes
    public class BooksController : ControllerBase
    {
        private readonly BookStoreDbContext _context;
        private readonly ILogger<BooksController> _logger;

        public BooksController(BookStoreDbContext context, ILogger<BooksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET all books
        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("User '{User}' requested all books", User.Identity?.Name);
            return Ok(_context.Books.ToList());
        }

        // POST (create) a new book
        [HttpPost]
        public IActionResult Create(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();

            _logger.LogInformation("User '{User}' created a new book: {BookName}", User.Identity?.Name, book.Name);
            return Ok(new { message = "Book created", book });
        }

        // PUT (update) a book
        [HttpPut("{id}")]
        public IActionResult Update(int id, Book updatedBook)
        {
            var book = _context.Books.Find(id);
            if (book == null)
            {
                _logger.LogWarning("User '{User}' tried to update non-existent book with ID {Id}", User.Identity?.Name, id);
                return NotFound(new { message = "Book not found" });
            }

            book.Name = updatedBook.Name;
            book.Category = updatedBook.Category;
            book.Price = updatedBook.Price;
            book.Description = updatedBook.Description;

            _context.SaveChanges();

            _logger.LogInformation("User '{User}' updated book ID {Id}", User.Identity?.Name, id);
            return Ok(new { message = "Book updated", book });
        }

        // DELETE a book
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = _context.Books.Find(id);
            if (book == null)
            {
                _logger.LogWarning("User '{User}' tried to delete non-existent book ID {Id}", User.Identity?.Name, id);
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            _logger.LogInformation("User '{User}' deleted book ID {Id}", User.Identity?.Name, id);
            return Ok(new { message = "Book deleted" });
        }
    }
}
