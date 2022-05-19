using System.Text.Json.Serialization;

namespace LogosAPI.Models
{
    public class PlannedMaintenance
    {
        public int id{ get; set; }

        public string dateofCreation { get; set; }

        public string scheduled { get; set; }

        public string affectedSolutions { get; set; }  

        public string text { get; set; }



        [JsonConstructor]
        public PlannedMaintenance() { }
        
        public PlannedMaintenance(string a, string t, DateTime scheduled)
        {
            this.id = 0;
            this.dateofCreation = DateTime.UtcNow.AddHours(2).ToString("MM/dd/yyyy H:mm");
            this.affectedSolutions = a;
            this.text = t;
            this.scheduled = scheduled.ToString("MM/dd/yyyy H:mm");
        }
    }
}
