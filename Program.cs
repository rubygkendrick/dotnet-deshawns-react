using Deshawns.Models;
using Deshawns.Models.DTOS;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//create a list of all of the Dogs
List<Dogs> dogs = new List<Dogs>
{
    new Dogs()
    {
        Id = 1,
        Name = "Pickles",
        WalkerId = 3,
        CityId = 4
    },
    new Dogs()
    {
        Id = 2,
        Name = "Buddy",
        WalkerId = 5,
        CityId = 2
    },
    new Dogs()
    {
        Id = 3,
        Name = "Max",
        WalkerId = 1,
        CityId = 6
    },
    new Dogs()
    {
        Id = 4,
        Name = "Daisy",
        WalkerId = 7,
        CityId = 9
    },
    new Dogs()
    {
        Id = 5,
        Name = "Charlie",
        WalkerId = 2,
        CityId = 3
    },
    new Dogs()
    {
        Id = 6,
        Name = "Lucy",
        WalkerId = 6,
        CityId = 7
    },
    new Dogs()
    {
        Id = 7,
        Name = "Bailey",
        WalkerId = 4,
        CityId = 8
    },
    new Dogs()
    {
        Id = 8,
        Name = "Molly",
        WalkerId = 9,
        CityId = 1
    },
    new Dogs()
    {
        Id = 9,
        Name = "Rocky",
        WalkerId = 8,
        CityId = 5
    }

};


app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogsDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
});


app.Run();
