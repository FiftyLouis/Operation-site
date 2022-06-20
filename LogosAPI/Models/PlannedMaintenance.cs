using System.Text.Json.Serialization;

namespace LogosAPI.Models
{
    public class plannedmaintenance
    {
        public int id { get; set; }

        public DateTime dateofCreation { get; set; }

        public DateTime scheduled { get; set; }

        public string duration { get; set; }

        public string affectedSolutions { get; set; }

        public string text { get; set; }



        [JsonConstructor]
        public plannedmaintenance() { }

        public plannedmaintenance(string a, string t, DateTime scheduled, DateTime d)
        {
            this.id = 0;
            this.dateofCreation = DateTime.UtcNow.AddHours(2);
            this.affectedSolutions = a;
            this.text = t;
            this.scheduled = scheduled;
            this.duration = d.ToString("t");
        }
    }
}
