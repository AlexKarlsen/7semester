using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using AspFitnessApi.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AspFitnessApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Accounts")]
    public class AccountsController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountsController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] DtoUser dtoUser)
        {
            var newUser = new ApplicationUser
            {
                UserName = dtoUser.Email,
                Email = dtoUser.Email,
                Name = dtoUser.Name,
            };
            var userCreationResult = await _userManager.CreateAsync(newUser, dtoUser.Password);
            if (userCreationResult.Succeeded)
            {
                return new ObjectResult(GenerateToken(dtoUser.Email));
            }
            foreach (var error in userCreationResult.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
            return BadRequest(ModelState);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] DtoUser dtoUser)
        {
            var passwordSignInResult = await _signInManager.PasswordSignInAsync(dtoUser.Email, dtoUser.Password, isPersistent: false, lockoutOnFailure: false);
            if (passwordSignInResult.Succeeded)
            {
                return new ObjectResult(GenerateToken(dtoUser.Email));
            }
            ModelState.AddModelError(string.Empty, "Invalid login");
            return BadRequest(ModelState);
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        private string GenerateToken(string username)
        {
            var claims = new Claim[] {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
            new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };
            var token = new JwtSecurityToken(
            new JwtHeader(new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("The secret that needs to be at least 16 characeterslong for HmacSha256")),
                SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
  }

    public class DtoUser
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }

  
}
