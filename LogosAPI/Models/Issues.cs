using System.Text.Json.Serialization;

namespace LogosAPI.Models
{
    public class issues
    {
        public int id { get; set; }

        public DateTime Date { get; set; }

        public string AffectedSolutions { get; set; }

        public string Text { get; set; }

        public DateTime ETA { get; set; }

        public DateTime? Solving { get; set; }

        public DateTime? Closing { get; set; }


        [JsonConstructor]
        public issues() { }

        public issues(string a, string t, DateTime eta)
        {
            this.id = 0;
            this.Date = DateTime.UtcNow.AddHours(2);
            this.AffectedSolutions = a;
            this.Text = t;
            this.ETA = eta;
            this.Solving = null;
            this.Closing = null;
        }
    }
}
