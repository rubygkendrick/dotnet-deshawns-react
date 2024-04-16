
namespace Deshawns.Models;

public class Dogs
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int WalkerId { get; set; }
    public Walker Walker { get; set; }
    public int CityId { get; set; }
    public City City { get; set; }
}