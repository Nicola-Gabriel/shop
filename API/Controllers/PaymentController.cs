using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentInterface _payment;
        public PaymentController(IPaymentInterface payment)
        {
            _payment = payment;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            return await _payment.CreateOrUpdateOrderIntent(basketId);
        }
    }
}