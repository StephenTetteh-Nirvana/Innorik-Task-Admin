namespace BookStoreApi.Web.Models
{
    public class Book
    {
        public int Id { get; set; }  // Primary Key
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
