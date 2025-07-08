using Microsoft.EntityFrameworkCore;
using BookStoreApi.Web.Models;

namespace BookStoreApi.Web.Data
{
    public class BookStoreDbContext : DbContext
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
