namespace LogosAPI.Models
{
    public class Issues
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public String? AffectedSolutions { get; set; }

        public String? Text { get; set; }

        public DateTime ETA { get; set; }

        public DateTime Solving { get; set; }

        public DateTime Closing { get; set; }
    }
}
