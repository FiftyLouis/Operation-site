using System.Text.Json.Serialization;

namespace LogosAPI.Models
{
    public class Issues
    {
        public int id { get; set; }

        public String Date { get; set; }

        public string AffectedSolutions { get; set; }

        public string Text { get; set; }

        public string ETA { get; set; }

        public string? Solving { get; set; }

        public string? Closing { get; set; }


        [JsonConstructor]
        public Issues() { }

       public Issues(string a, string t, DateTime eta)
        {
            this.id = 0;
            this.Date = DateTime.UtcNow.AddHours(2).ToString("MM/dd/yyyy H:mm");
            this.AffectedSolutions = a;
            this.Text = t;
            this.ETA = eta.ToString("MM/dd/yyyy H:mm");
            this.Solving = null;
            this.Closing = null;
        }
    }
}
