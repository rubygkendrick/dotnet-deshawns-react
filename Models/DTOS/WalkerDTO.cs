namespace Deshawns.Models.DTOS;

public class WalkerDTO
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<CityDTO> Cities { get; set; }

}