using Microsoft.AspNetCore.Mvc;
using BookStoreApi.Web.DTOs;
using BookStoreApi.Web.Data;
using BookStoreApi.Web.Models;
using BookStoreApi.Web.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace BookStoreApi.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BookStoreDbContext _context;
        private readonly TokenService _tokenService;
        private readonly ILogger<AuthController> _logger;
        private readonly PasswordHasher<User> _hasher = new();

        public AuthController(BookStoreDbContext context, TokenService tokenService, ILogger<AuthController> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            _logger.LogInformation("Login attempt by user: {Username}", dto.Username);

            var user = _context.Users.SingleOrDefault(u => u.Username == dto.Username);
            if (user == null)
            {
                _logger.LogWarning("Login failed: unknown username '{Username}'", dto.Username);
                return Unauthorized(new { message = "Invalid username" });
            }

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                _logger.LogWarning("Login failed: invalid password for user '{Username}'", dto.Username);
                return Unauthorized(new { message = "Invalid password" });
            }

            var token = _tokenService.CreateToken(user);

            _logger.LogInformation("User '{Username}' logged in successfully", dto.Username);

            return Ok(new
            {
                message = "Login successful",
                token = token
            });
        }
    }
}
