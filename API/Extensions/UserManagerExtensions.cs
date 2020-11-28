using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByEmailWithUserAddress(this UserManager<AppUser> input, 
        ClaimsPrincipal claim)
        {
            var email = claim?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindEmailByClaimsPrincipal(this UserManager<AppUser> user, 
        ClaimsPrincipal claim)
        {
           var email = claim?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

           return await user.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}