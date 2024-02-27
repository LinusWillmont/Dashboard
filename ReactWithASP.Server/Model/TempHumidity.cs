using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempHumiditySensor.Model
{
    [Table("temp_humidity_readings")]
    public class TempHumidity
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("logged_at")]
        public DateTime LoggedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [Column("temp")]
        public required int Temp { get; set; }

        [Required]
        [Column("humidity")]
        public required int Humidity { get; set; }

    }
}
