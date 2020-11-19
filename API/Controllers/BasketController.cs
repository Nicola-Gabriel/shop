using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> SetBasketAsync (CustomerBasket basket)
        {
            var createdBasket = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(createdBasket);
        }

        [HttpDelete]
        public async Task DeleteItems (string id)
        {
           await _basketRepository.DeleteBasketAsync(id);
        }
    }
}