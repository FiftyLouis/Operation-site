using System.Text.Json.Serialization;

namespace LogosAPI.Models
{
    public class Issues
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string AffectedSolutions { get; set; }

        public string Text { get; set; }

        public DateTime ETA { get; set; }

        public DateTime? Solving { get; set; }

        public DateTime? Closing { get; set; }


        [JsonConstructor]
        public Issues() { }

       public Issues(string a, string t, DateTime eta)
        {
            this.Id = 0;
            this.Date = DateTime.Now;
            this.AffectedSolutions = a;
            this.Text = t;
            this.ETA = eta;
            this.Solving = null;
            this.Closing = null;
        }
    }
}
