using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using LogosAPI.Data;
using LogosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LogosAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly ApiContext _context;

        public AuthController(IConfiguration configuration, ApiContext context)
        {
            this.configuration = configuration;
            this._context = context;
        }

        [HttpPost("/register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User user = new User();
            foreach (var u in _context.users)
            {
                if (u.UserName.Equals(request.UserName))
                {
                    return BadRequest("error userName already used");
                }
            }
            user.UserName = request.UserName;
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            _context.Add(user);

            _context.SaveChanges();


            return Ok(user);
        }

        [HttpPost("/login")]
        public async Task<ActionResult<User>> Login(UserDto request)
        {

            foreach (var user in _context.users)
            {
                if (user.UserName.Equals(request.UserName))
                {
                    if (VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                    {
                        string token = CreateToken(user);
                        return Ok(token);
                    }
                    return BadRequest("bad password");
                }
            }
            return BadRequest("user not found");
        }

        [HttpDelete("/DeleteUser")]
        public JsonResult DeleteUser(string userName)
        {
            foreach (var user in _context.users)
            {
                if (user.UserName.Equals(userName))
                {
                    _context.Remove(user);

                    _context.SaveChanges();

                    return new JsonResult(Ok(user));
                }
            }
            return new JsonResult(NotFound("user not found"));
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);


            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedhash.SequenceEqual(passwordHash);
            }
        }
    }
}
