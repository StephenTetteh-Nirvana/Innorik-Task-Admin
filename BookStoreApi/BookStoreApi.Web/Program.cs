using BookStoreApi.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using BookStoreApi.Web.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BookStoreApi.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// Allow requests to be made to the backend from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // your Next.js app origin
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add services to the container
builder.Services.AddDbContext<BookStoreDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // Custom Api endpoints from Controllers. 

// JWT Authentication (Auth Registration)
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();


var app = builder.Build();

// Enable CORS before any endpoints
app.UseCors("AllowFrontend");

app.UseMiddleware<BookStoreApi.Web.Middleware.GlobalExceptionMiddleware>();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

// app.UseHttpsRedirection();

// Being used to create a new admin
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BookStoreDbContext>();

    context.Database.Migrate();

    var hasher = new PasswordHasher<User>();

    if (!context.Users.Any(u => u.Username == "admin"))
    {
      var user = new User
        {
            Username = "admin",
            Role = "Admin"
        };

        user.PasswordHash = hasher.HashPassword(user, "admin123");

        context.Users.Add(user);
        context.SaveChanges();
    }
}

app.Run();
