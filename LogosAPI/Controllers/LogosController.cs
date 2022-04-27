using LogosAPI.Data;
using LogosAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LogosAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class LogosController : ControllerBase
    {
        private readonly ApiContext _context;

        public LogosController(ApiContext context)
        {
            _context = context;
        }

        [HttpPost, AllowAnonymous]
        public JsonResult CreateEditIssues(Issues issues)
        {
            if (issues.id == 0)
            {
                _context.Issues.Add(issues);
            }
            else
            {
                var issuesInDb = _context.Issues.Find(issues.id);
                if (issuesInDb == null)
                    return new JsonResult(NotFound());
                issuesInDb = issues;
            }

            _context.SaveChanges();

            return new JsonResult(Ok(issues));
        }

        //get
        [HttpGet]
        public JsonResult GetIssues(int id)
        {
            var issues = _context.Issues.Find(id);

            if (issues == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(issues));
        }


        //delete
        [HttpDelete]
        public JsonResult DeleteIssues(int id)
        {
            var issue = _context.Issues.Find(id);

            if (issue == null)
                return new JsonResult(NotFound());

            _context.Issues.Remove(issue);

            _context.SaveChanges();

            return new JsonResult(Ok(issue));
        }

        //GetAll
        [HttpGet("/GetAllIssues")]
        public JsonResult GetAllIssues()
        {
            var issues = _context.Issues.ToList();

            return new JsonResult(issues);
        }

        //planned Maintenance
        [HttpPost, AllowAnonymous]
        public JsonResult CreateEditMaintenance(PlannedMaintenance pm)
        {
            if (pm.id == 0)
            {
                _context.PlannedMaintenance.Add(pm);
            }
            else
            {
                var pmInDb = _context.PlannedMaintenance.Find(pm.id);
                if (pmInDb == null)
                    return new JsonResult(NotFound());
                pmInDb = pm;
            }

            _context.SaveChanges();

            return new JsonResult(Ok(pm));
        }

        [HttpGet]
        public JsonResult GetPm(int id)
        {
            var pm= _context.PlannedMaintenance.Find(id);

            if (pm == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(pm));
        }

        [HttpDelete]
        public JsonResult DeletePm(int id)
        {
            var pm = _context.PlannedMaintenance.Find(id);

            if (pm == null)
            {
                return new JsonResult(NotFound());
            }

            _context.PlannedMaintenance.Remove(pm);

            _context.SaveChanges();

            return new JsonResult(Ok(pm));
        }

        [HttpGet("/GetAllPm")]
        public JsonResult GetAllPm()
        {
            var pms = _context.PlannedMaintenance.ToList();

            return new JsonResult(pms);
        }

//specific function

        //get plannedMaintennace ScheduledDate > currentDate
        [HttpGet("/GetPmScheduledDate"), AllowAnonymous]
        public JsonResult GetPmScheduledDate()
        {
            List<PlannedMaintenance> pms = new List<PlannedMaintenance>();

            foreach (var pm in _context.PlannedMaintenance)
            {
               int Results = DateTime.Compare(pm.scheduled, DateTime.Now.AddDays(-1));

                if(Results >= 0)
                    pms.Add(pm);
            }

            var orderByPm = from pm in pms
                            orderby pm.dateofCreation
                            select pm;

            pms = orderByPm.ToList();

            return new JsonResult(pms);
        }


        //get issues for current issues page
        [HttpGet("/GetCurrentIssues"), AllowAnonymous]
        public JsonResult GetCurrentIssues()
        {
            List<Issues> issues = new List<Issues>();

            foreach (var issue in _context.Issues)
            {
                if(issue.Closing == null)
                    issues.Add(issue);

            }

            var orderByTimeCreation = from issue in issues
                                      orderby issue.Date descending
                                      select issue;

            //issues.OrderByDescending(i => i.Date)

            issues = orderByTimeCreation.ToList();

            return new JsonResult(issues);
        }

        //get issues for historical issues
        [HttpGet("/GetHistoricalIssues"), AllowAnonymous]
        public JsonResult GetHistoricalIssues()
        {
            List<Issues> issues = new List<Issues>();

            foreach (var issue in _context.Issues)
            {
                if (issue.Closing != null)
                    issues.Add(issue);

            }

            var orderByTimeCreation = from issue in issues
                                      orderby issue.Date descending
                                      select issue;


            issues = orderByTimeCreation.ToList();

            return new JsonResult(issues);
        }


        //admin part

        [HttpPost("/SolvedIssue")]
        public JsonResult SolvedIssue(int id, DateTime date)
        {
            var issue = _context.Issues.Find(id);

            if (issue == null)
            {
                return new JsonResult(NotFound());
            }

            _context.Issues.Find(id).Closing = DateTime.Now;
            _context.Issues.Find(id).Solving = date;


            _context.SaveChanges();

            return new JsonResult(issue);

        }

      [HttpPost("/CreateIssue")]
        public JsonResult CreateIssue(string AffectedSolutions, string Text, DateTime ETA)
        {
            Issues issue = new Issues(AffectedSolutions, Text, ETA);
            CreateEditIssues(issue);

            return new JsonResult(issue);
        }


        [HttpDelete("/DeletePmAdmin")]
        public JsonResult DeletePmAdmin(int id)
        {
            var pm = _context.PlannedMaintenance.Find(id);

            if (pm == null)
            {
                return new JsonResult(NotFound());
            }

            _context.PlannedMaintenance.Remove(pm);

            _context.SaveChanges();

            return new JsonResult(Ok(pm));
        }

        [HttpPost("/CreatePm")]
        public JsonResult CreatePm(string AffectedSolutions, string Text, DateTime s)
        {
             PlannedMaintenance pm = new PlannedMaintenance(AffectedSolutions, Text, s);
            CreateEditMaintenance(pm);

            return new JsonResult(pm);
        }


        //view historical maintenance
        [HttpGet("/GetHistoricalPmAdmin")]
        public JsonResult GetHistoricalPmAdmin()
        {
            List<PlannedMaintenance> pms = new List<PlannedMaintenance>();

            foreach (var pm in _context.PlannedMaintenance)
            {
                int Results = DateTime.Compare(pm.scheduled, DateTime.Now.AddDays(-1));

                if (Results < 0)
                    pms.Add(pm);
            }

            var orderByPm = from pm in pms
                            orderby pm.dateofCreation descending
                            select pm;

            pms = orderByPm.ToList();

            return new JsonResult(pms);
        }


        [HttpGet("/GetChartPm")]
        public JsonResult GetChartPm()
        {
            int[] tab = { 0, 0, 0, 0 };
            foreach(var pm in _context.PlannedMaintenance)
            {
                if (DateTime.Compare(pm.scheduled, DateTime.Today.AddDays(1)) <= 0)
                    tab[0]++;
                else if (DateTime.Compare(pm.scheduled, DateTime.Today.AddDays(7)) <= 0)
                    tab[1]++;
                else if (DateTime.Compare(pm.scheduled, DateTime.Today.AddDays(30)) <= 0)
                    tab[2]++;
                else if (DateTime.Compare(pm.scheduled, DateTime.Today.AddDays(30)) > 0)
                    tab[3]++;
            }

            return new JsonResult(tab);
        }


    }
}
