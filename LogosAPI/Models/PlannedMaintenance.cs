namespace LogosAPI.Models
{
    public class PlannedMaintenance
    {
        public int id{ get; set; }

        public DateTime dateofCreation { get; set; }

        public DateTime scheduled { get; set; }

        public string affectedSolutions { get; set; }  

        public string text { get; set; }
    }
}
