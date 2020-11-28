using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppUserDbContextSeed
    {
        public static async Task Seed(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser 
                {
                    DisplayName = "Gabriel",
                    Email = "gabriel@test",
                    UserName = "Gabriel",
                    Address = new Address
                    {
                        FirstName = "Nicola",
                        LastName = "Gabriel",
                        City = "Craiova",
                        Zipcode = "00000",
                        Street = "doctor nic ion"
                        
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}