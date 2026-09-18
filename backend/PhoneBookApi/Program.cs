using Microsoft.EntityFrameworkCore;
using PhoneBookApi.Data;

var builder = WebApplication.CreateBuilder(args);

// registre los controladores para que funcionen las clases de tipo ContactsController
builder.Services.AddControllers();

// genera una pagina para probar la API sin Angular
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// registre DbContext para que use PostgreSQL con la cadena
//    de conexión que esta en appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// como creo que angular corre en otro puerto por ejemplo 4200 distinto al backend 5000,
//    puede que el navegador bloquee las peticiones por seguridad si no habilito esto
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middlewares se ejecuta en orden en cada peticion que le llega

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
