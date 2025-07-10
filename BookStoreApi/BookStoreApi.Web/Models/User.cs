namespace BookStoreApi.Web.Models
{
    public class User
    {
        public int Id { get; set; }  // Primary Key
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }  // E.g., Admin, Customer
    }
}

