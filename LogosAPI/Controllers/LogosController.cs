using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogosAPI.Models;
using LogosAPI.Data;

namespace LogosAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
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

            return new JsonResult(Ok(issue));
        }

        //GetAll
        [HttpGet("/GetAllIssues")]
        public JsonResult GetAllIssues()
        {
            var issues = _context.Issues.ToList();

            return new JsonResult(issues);
        }
    }
}
