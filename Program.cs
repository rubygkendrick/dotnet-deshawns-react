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
List<Walker> walkers = new List<Walker>
{
    new Walker()
    {
        Id = 1,
        Name = "Ruby",
    },
    new Walker()
{
    Id = 2,
    Name = "Dobby",
},
new Walker()
{
    Id = 3,
    Name = "Nancy",
},
new Walker()
{
    Id = 4,
    Name = "Aaron",
},
new Walker()
{
    Id = 5,
    Name = "Paul",
},
new Walker()
{
    Id = 6,
    Name = "Gill",
},
new Walker()
{
    Id = 7,
    Name = "Jimmy",
},
new Walker()
{
    Id = 8,
    Name = "Andy",
},
new Walker()
{
    Id = 9,
    Name = "Izzy",
}

};

List<City> cities = new List<City>
{
    new City()
{
    Id = 1,
    Name = "Nashville",
},
new City()
{
    Id = 2,
    Name = "New York City",
},
new City()
{
    Id = 3,
    Name = "Los Angeles",
},
new City()
{
    Id = 4,
    Name = "Chicago",
},
new City()
{
    Id = 5,
    Name = "Houston",
},
new City()
{
    Id = 6,
    Name = "Phoenix",
},
new City()
{
    Id = 7,
    Name = "Philadelphia",
},
new City()
{
    Id = 8,
    Name = "San Antonio",
},
new City()
{
    Id = 9,
    Name = "San Diego",
}

};

List<WalkerCities> walkerCities = new List<WalkerCities>
{
    new WalkerCities()
    {
        Id = 1,
        WalkerId = 3,
        CityId = 4
    },
    new WalkerCities()
    {
        Id = 2,
        WalkerId = 5,
        CityId = 2
    },
    new WalkerCities()
    {
        Id = 3,
        WalkerId = 1,
        CityId = 6
    },
    new WalkerCities()
    {
        Id = 4,
        WalkerId = 7,
        CityId = 9
    },
    new WalkerCities()
    {
        Id = 5,
        WalkerId = 2,
        CityId = 3
    },
    new WalkerCities()
    {
        Id = 6,
        WalkerId = 6,
        CityId = 7
    },
    new WalkerCities()
    {
        Id = 7,
        WalkerId = 4,
        CityId = 8
    },
    new WalkerCities()
    {
        Id = 8,
        WalkerId = 9,
        CityId = 1
    },
    new WalkerCities()
    {
        Id = 9,
        WalkerId = 8,
        CityId = 5
    }

};


app.MapGet("/api/hello", () =>
{
    return new { Message = "🐕‍🦺 Welcome to DeShawn's Dog Walking 🐩" };
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


app.MapGet("/api/cities", () =>
{
    List<CityDTO> cityDTOs = new List<CityDTO>();

    foreach (City city in cities)
    {
        // Find the walker cities for the current city
        List<WalkerCities> walkerCitiesForCity = walkerCities.Where(wc => wc.CityId == city.Id).ToList();

        // Find the walkers for the current city
       
        List<Walker> walkersForCity = walkerCitiesForCity.Select(wc =>
        {
            // Find the walker for the current walker city
            Walker walker = walkers.FirstOrDefault(w => w.Id == wc.WalkerId);
            return walker;
        }).Where(walker => walker != null).ToList(); //filter out null walkers


        // Convert walkers to WalkerDTOs
        List<WalkerDTO> walkerDTOs = walkersForCity.Select(walker => new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        }).ToList();

        // Create CityDTO for the current city
        CityDTO cityDTO = new CityDTO
        {
            Id = city.Id,
            Name = city.Name,
            Walkers = walkerDTOs // Assign the list of WalkerDTOs to the Walkers property
        };

        // Add the CityDTO to the list
        cityDTOs.Add(cityDTO);
    }

    return cityDTOs;
});



app.MapGet("/api/walkers", () =>
{
    List<WalkerDTO> walkerDTOs = new List<WalkerDTO>();

    foreach (Walker walker in walkers)
    {
        // Find the walker cities for the current walker
        List<WalkerCities> walkerCitiesForWalker = walkerCities.Where(wc => wc.WalkerId == walker.Id).ToList();

        // Find the cities for the current walker
        List<City> citiesForWalkers = walkerCitiesForWalker.Select(wc => cities.First(c => c.Id == wc.CityId)).ToList();

        // Convert cities to cityDTOs
        List<CityDTO> cityDTOs = citiesForWalkers.Select(city => new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }).ToList();

        // Create WalkerDTO for the current walker
        WalkerDTO walkerDTO = new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name,
            Cities = cityDTOs// Assign the list of WalkerDTOs to the Walkers property
        };

        // Add the CityDTO to the list
        walkerDTOs.Add(walkerDTO);
    }

    return walkerDTOs;
});

app.MapGet("/api/walkers/{id}", (int id) =>
{
    List<WalkerDTO> walkerDTOs = new List<WalkerDTO>();

    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    List<WalkerCities> walkerCitiesForWalker = walkerCities.Where(wc => wc.WalkerId == walker.Id).ToList();
    List<City> citiesForWalkers = walkerCitiesForWalker.Select(wc => cities.First(c => c.Id == wc.CityId)).ToList();
    List<CityDTO> cityDTOs = citiesForWalkers.Select(city => new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    }).ToList();

    if (walker == null)
    {
        return Results.NotFound();
    }


    return Results.Ok(new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        Cities = cityDTOs
    });
});



app.MapPost("/api/dogs", (Dogs dog) =>
{
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);


    if (dog == null)
    {
        return Results.BadRequest();
    }

    if (dogs.Count == 0)
    {
        dog.Id = 1; // Set an initial ID of 1 for the new dog
    }
    else
    {
        // Get the maximum ID from existing dogs and increment it
        dog.Id = dogs.Max(d => d.Id) + 1;
    }

    dogs.Add(dog);

    return Results.Created($"/api/dogs/{dog.Id}", new DogsDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = 0,
        Walker = null,
        CityId = city.Id,
        City = new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }
    });

});

app.MapGet("/api/cities/{id}", (int id) =>
{

    City city = cities.FirstOrDefault(c => c.Id == id);

    List<WalkerCities> walkerCitiesForCity = walkerCities.Where(wc => wc.WalkerId == id).ToList();

    List<Walker> walkersForCity = walkerCitiesForCity.Select(wc => walkers.First(w => w.Id == wc.WalkerId)).ToList();

    List<WalkerDTO> walkerDTOs = walkersForCity.Select(walker => new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name
    }).ToList();


    return new CityDTO
    {
        Id = city.Id,
        Name = city.Name,
        Walkers = walkerDTOs
    };

});


app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dogs dog = dogs.FirstOrDefault(d => d.Id == id);
    if (dog == null)
    {
        return Results.NotFound();
    }


    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);


    return Results.Ok(new DogsDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        Walker = walker != null ? new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        } : null,
        CityId = dog.CityId,
        City = city != null ? new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        } : null
    });
});


app.MapPost("/api/cities", (City city) =>
{

    if (city == null)
    {
        return Results.BadRequest();
    }

    if (cities.Count == 0)
    {
        city.Id = 1;
    }
    else
    {
        city.Id = cities.Max(c => c.Id) + 1;
    }

    cities.Add(city);

    return Results.Created($"/api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name,
        Walkers = new List<WalkerDTO> {
            null
        }
    });

});


app.MapPut("/api/dogs/{id}", (int id, Dogs updatedDog) =>
{

    Dogs dogToUpdate = dogs.FirstOrDefault(dog => dog.Id == id);

    if (dogToUpdate == null)
    {
        return Results.NotFound();
    }


    dogToUpdate.WalkerId = updatedDog.WalkerId;

    return Results.Ok(dogToUpdate);
});



app.MapPut("/api/walkers/{id}", (int id, Walker updatedWalker) =>
{
    Walker walkerToUpdate = walkers.FirstOrDefault(w => w.Id == id);
    if (walkerToUpdate == null)
    {
        return Results.NotFound();
    }
    walkerCities = walkerCities.Where(wc => wc.WalkerId != walkerToUpdate.Id).ToList();
    if (updatedWalker.Cities != null)
    {

        foreach (City city in updatedWalker.Cities)
        {
            if (city != null)
            {
                WalkerCities newWC = new WalkerCities
                {
                    Id = walkerCities.Count > 0 ? walkerCities.Max(wc => wc.Id) + 1 : 1,
                    WalkerId = walkerToUpdate.Id,
                    CityId = city.Id
                };
                walkerCities.Add(newWC);
            }
        }
    };

    List<WalkerCities> walkerCitiesForWalker = walkerCities.Where(wc => wc.WalkerId == walkerToUpdate.Id).ToList();
    List<City> citiesForWalker = walkerCitiesForWalker.Select(wc => cities.First(c => c.Id == wc.CityId)).ToList();
    List<CityDTO> cityDTOs = citiesForWalker.Select(city => new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    }).ToList();



    return Results.Ok(new WalkerDTO
    {
        Id = walkerToUpdate.Id,
        Name = updatedWalker.Name,
        Cities = cityDTOs
    });

});

app.MapDelete("/api/walkerToDelete/{id}", (int id) =>
{
    Walker walkerToDelete = walkers.FirstOrDefault(w => w.Id == id);

    foreach (Dogs dog in dogs)
    {
        if (dog.WalkerId == id)
        {
            dog.WalkerId = 0;
        }
    }


    if (walkerToDelete == null)
    {
        return Results.BadRequest();
    }
    walkers.Remove(walkerToDelete);

    return Results.NoContent();

});

app.MapDelete("/api/dogToDelete/{id}", (int id) =>
{
    Dogs dogToDelete= dogs.FirstOrDefault(d => d.Id == id);

    if (dogToDelete == null)
    {
        return Results.BadRequest();
    }
    dogs.Remove(dogToDelete);

    return Results.NoContent();

});


app.Run();
