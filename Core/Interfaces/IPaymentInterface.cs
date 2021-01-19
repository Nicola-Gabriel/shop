using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IPaymentInterface
    {
         Task<CustomerBasket> CreateOrUpdateOrderIntent(string basketId);
    }
}