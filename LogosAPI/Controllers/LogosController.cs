using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogosAPI.Models;
using LogosAPI.Data;
using Microsoft.AspNetCore.Authorization;

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

        [HttpPost]
        public JsonResult CreateEditIssues(Issues issues)
        {
            if (issues.Id == 0)
            {
                _context.Issues.Add(issues);
            }
            else
            {
                var issuesInDb = _context.Issues.Find(issues.Id);
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
        [HttpPost]
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
               int Results = DateTime.Compare(pm.scheduled, DateTime.Now);

                if(Results > 0)
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

    }
}
